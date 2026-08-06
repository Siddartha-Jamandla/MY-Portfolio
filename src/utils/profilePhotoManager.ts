import { useState, useEffect } from 'react';

export const PROFILE_PHOTO_STORAGE_KEY = 'siddartha_profile_photo';

// Default fallback photo URL if user hasn't uploaded one yet
export const DEFAULT_PROFILE_PHOTO = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800';

export function getStoredProfilePhoto(): string | null {
  try {
    return localStorage.getItem(PROFILE_PHOTO_STORAGE_KEY);
  } catch (e) {
    return null;
  }
}

export function setStoredProfilePhoto(photoUrl: string | null): void {
  try {
    if (photoUrl) {
      localStorage.setItem(PROFILE_PHOTO_STORAGE_KEY, photoUrl);
    } else {
      localStorage.removeItem(PROFILE_PHOTO_STORAGE_KEY);
    }
    // Dispatch global custom event for instant reactivity across all components
    window.dispatchEvent(new Event('siddartha_photo_updated'));
  } catch (e) {
    console.error('Failed to update profile photo in localStorage', e);
  }
}

export function useProfilePhoto() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(() => getStoredProfilePhoto());

  useEffect(() => {
    const handleUpdate = () => {
      setPhotoUrl(getStoredProfilePhoto());
    };

    window.addEventListener('siddartha_photo_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('siddartha_photo_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    photoUrl,
    setPhoto: (url: string | null) => setStoredProfilePhoto(url)
  };
}
