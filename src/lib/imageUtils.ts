export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const validateImageFile = (file: File): string | null => {
  if (!file.type.startsWith("image/")) {
    return "فایل باید تصویر باشد";
  }

  if (file.size > MAX_FILE_SIZE) {
    return `حجم فایل نباید بیش از ${formatFileSize?.(MAX_FILE_SIZE)} باشد`;
  }

  return null;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes?.[i];
};

export const compressImage = async (
  file: File,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.8
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error("خطا در فشرده‌سازی تصویر"));
          }
        },
        file.type,
        quality
      );
    };

    img.onerror = () => {
      reject(new Error("خطا در بارگذاری تصویر"));
    };

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e?.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};
