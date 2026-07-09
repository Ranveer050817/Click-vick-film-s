import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface WebsiteSettings {
  business_name?: string;
  tagline?: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  youtube?: string;
  email?: string;
  address?: string;
  hero_heading?: string;
  hero_description?: string;
  hero_image?: string;
}

interface Category {
  id: number;
  name: string;
}

interface GalleryImage {
  id: number;
  category_id: number;
  image_url: string;
  title: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

interface Package {
  id: number;
  name: string;
  subtitle: string;
  price: string;
  is_popular: boolean;
  features: string[];
}

interface Review {
  id: number;
  name: string;
  location: string;
  text: string;
}

interface SupabaseContextType {
  settings: WebsiteSettings | null;
  categories: Category[];
  galleryImages: GalleryImage[];
  services: Service[];
  packages: Package[];
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const SupabaseContext = createContext<SupabaseContextType>({
  settings: null,
  categories: [],
  galleryImages: [],
  services: [],
  packages: [],
  reviews: [],
  loading: true,
  error: null,
});

export const useSupabase = () => useContext(SupabaseContext);

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL' || !supabaseKey || supabaseKey === 'YOUR_SUPABASE_ANON_KEY') {
          setError("Supabase credentials not configured in environment variables.");
          setLoading(false);
          return;
        }

        const [
          { data: settingsData, error: settingsError },
          { data: categoriesData, error: categoriesError },
          { data: galleryData, error: galleryError },
          { data: servicesData, error: servicesError },
          { data: packagesData, error: packagesError },
          { data: reviewsData, error: reviewsError }
        ] = await Promise.all([
          supabase.from('website_settings').select('*').single(),
          supabase.from('categories').select('*').order('id', { ascending: true }),
          supabase.from('gallery_images').select('*').order('id', { ascending: true }),
          supabase.from('services').select('*').order('id', { ascending: true }),
          supabase.from('packages').select('*').order('id', { ascending: true }),
          supabase.from('reviews').select('*').order('id', { ascending: true })
        ]);

        if (settingsError && settingsError.code !== 'PGRST116') console.warn('Settings error:', settingsError);
        if (categoriesError) console.warn('Categories error:', categoriesError);
        if (galleryError) console.warn('Gallery error:', galleryError);
        
        let finalCategories = categoriesData || [];
        if (finalCategories.length === 0) {
          finalCategories = [{ id: 1, name: 'Gallery' }];
        }

        let finalGalleryImages = galleryData || [];

        if (finalGalleryImages.length === 0) {
          try {
            const { data: storageFiles, error: storageError } = await supabase.storage.from('gallery').list("", {
              limit: 100,
              offset: 0
            });
            if (!storageError && storageFiles) {
              const defaultCategoryId = finalCategories[0].id;
              finalGalleryImages = storageFiles
                .filter(file => file.name && file.name !== '.emptyFolderPlaceholder' && file.name !== '.DS_Store' && file.id)
                .map((file, index) => ({
                  id: index + 10000,
                  category_id: defaultCategoryId,
                  image_url: supabase.storage.from('gallery').getPublicUrl(file.name).data.publicUrl,
                  title: file.name.split('.')[0]
                }));
            }
          } catch (storageErr) {
            console.error('Error fetching from storage bucket:', storageErr);
          }
        }

        setSettings(settingsData);
        setCategories(finalCategories);
        setGalleryImages(finalGalleryImages);
        setServices(servicesData || []);
        setPackages(packagesData || []);
        setReviews(reviewsData || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load website data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SupabaseContext.Provider
      value={{
        settings,
        categories,
        galleryImages,
        services,
        packages,
        reviews,
        loading,
        error
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};
