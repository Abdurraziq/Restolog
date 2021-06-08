const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
      console.log('Pendaftaran ServiceWorker berhasil');
    } catch (error) {
      console.log('Pendaftaran ServiceWorker gagal', error);
    }
  } else {
    console.log('Browser ini tidak mendukung ServiceWorker.');
  }
};

export {swRegister};
