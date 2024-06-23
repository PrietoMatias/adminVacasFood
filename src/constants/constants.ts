export const URL: string = 'http://localhost:3001/api'


export const dateParser = (date: string): string => {
  const fecha = new Date(date)
  const año = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();
  const horas = fecha.getHours();
  const minutos = fecha.getMinutes();
  const segundos = fecha.getSeconds();
  const agregarCero = (numero: number): string | number => {
    return numero < 10 ? `0${numero}` : numero;
  };
  const fechaFormateada = `${agregarCero(dia)}/${agregarCero(mes)}/${año} ${agregarCero(horas)}:${agregarCero(minutos)}:${agregarCero(segundos)}`;
  return fechaFormateada

}