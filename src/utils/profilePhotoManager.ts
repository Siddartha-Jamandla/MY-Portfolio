import { useState, useEffect } from 'react';
export const PROFILE_PHOTO_STORAGE_KEY = 'siddartha_profile_photo';

// Default profile photo URL provided by user
export const DEFAULT_PROFILE_PHOTO = 'https://i.postimg.cc/Z5G0BnZL/Generated-Image-September-14-2025-8-37AM-090126.png';

export function getStoredProfilePhoto(): string | null {
  try {
    const val = localStorage.getItem(PROFILE_PHOTO_STORAGE_KEY);
    return val && val.trim().length > 0 ? val.trim() : null;
  } catch (e) {
    return null;
  }
}

export function setStoredProfilePhoto(photoUrl: string | null): void {
  try {
    if (photoUrl && photoUrl.trim().length > 0) {
      localStorage.setItem(PROFILE_PHOTO_STORAGE_KEY, photoUrl.trim());
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
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    return getStoredProfilePhoto() || DEFAULT_PROFILE_PHOTO;
  });

  useEffect(() => {
    const handleUpdate = () => {
      const stored = getStoredProfilePhoto();
      setPhotoUrl(stored || DEFAULT_PROFILE_PHOTO);
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
    hasCustomPhoto: !!getStoredProfilePhoto(),
    setPhoto: (url: string | null) => setStoredProfilePhoto(url)
  };
}

