import { AmbientScene } from '../types';

export const AMBIENT_SCENES: AmbientScene[] = [
  {
    id: 'rainy-library',
    name: 'Thư Viện Mưa Đêm',
    location: 'Góc đọc sách tầng áp mái',
    imageUrl: 'https://images.unsplash.com/photo-1507842229451-7f01be7fe7ab?q=80&w=2000&auto=format&fit=crop',
    defaultAmbient: {
      rain: 0.45,
      fire: 0.1,
      cafe: 0.0,
      vinyl: 0.25,
    },
    accentColor: '#F97316',
  },
  {
    id: 'midnight-cafe',
    name: 'Quán Cà Phê Lúc 2h Đêm',
    location: 'Góc bàn nhỏ gần ô cửa sổ',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2000&auto=format&fit=crop',
    defaultAmbient: {
      rain: 0.2,
      fire: 0.0,
      cafe: 0.5,
      vinyl: 0.3,
    },
    accentColor: '#EAB308',
  },
  {
    id: 'fireplace-cabin',
    name: 'Nhà Gỗ Bên Lò Sưởi',
    location: 'Rừng thông cao nguyên sương mù',
    imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2000&auto=format&fit=crop',
    defaultAmbient: {
      rain: 0.1,
      fire: 0.6,
      cafe: 0.0,
      vinyl: 0.2,
    },
    accentColor: '#FB923C',
  },
  {
    id: 'night-train',
    name: 'Chuyến Tàu Đêm Xuyên Thành Phố',
    location: 'Toa tàu vắng nhìn ra ánh đèn ngoại ô',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=2000&auto=format&fit=crop',
    defaultAmbient: {
      rain: 0.3,
      fire: 0.0,
      cafe: 0.2,
      vinyl: 0.35,
    },
    accentColor: '#38BDF8',
  },
  {
    id: 'cozy-bedroom',
    name: 'Phòng Ngủ Ánh Đèn Vàng',
    location: 'Chiếc gối êm và tách trà cúc',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop',
    defaultAmbient: {
      rain: 0.25,
      fire: 0.15,
      cafe: 0.0,
      vinyl: 0.15,
    },
    accentColor: '#A78BFA',
  },
];
