import { htmlTemplate } from '../util/htmlTemplate';
import { DataMail } from '../interface';
import { DataBooking } from '../email.service';

export const welcomeTemplate = (fullName: string): string => {
  const data: DataMail = {
    title: `Bienvenido`,
    userName: `Hola, ${fullName}`,
    info: `Te damos la bienvenida a nuestra comunidad Slow Movies, donde encontrarás los mejores servicios para birndarte mayor comodidad a la hora de ver tus películas favoritas.`,
    buttonTitle: 'Comenzar',
    link: `http://localhost:4200/`,
  };
  return htmlTemplate(data);
};

export const recoveryPassTemplate = (
  fullName: string,
  userId: string,
): string => {
  const data: DataMail = {
    title: `Recuperación de Contraseña`,
    userName: `Hola, ${fullName}`,
    info: `Hemos recibido una petición para recuperar tu contraseña. Si has sido tú, por favor, puede darle clic en el siguiente enlace y tendrás acceso para poder realizar la recuperación de tu contraseña. En otro caso, no dudes en contactarnos.`,
    buttonTitle: 'Recuperar',
    link: `http://localhost:4200/auth/recovery-password/${userId}`,
  };

  return htmlTemplate(data);
};

export const bookingTemplate = (
  fullName: string,
  booking: DataBooking,
): string => {
  const data: DataMail = {
    title: `Recibo SlowMovies`,
    userName: `Hola, ${fullName}, este es tu recibo:`,
    info: `Su pago realizado por su reserva N°: ${booking.boodingId}, para ver ${booking.movie_title}, ha sido procesado con éxito, le recordamos que debe asistir ${booking.movie_date} a las ${booking.start_hour}, recordamos que si su recibo no es el esperado, puede ponerse en contacto con nuestro equipo de soporte`,
    buttonTitle: 'none',
    link: `none`,
  };

  return htmlTemplate(data);
};
