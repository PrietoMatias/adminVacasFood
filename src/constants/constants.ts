export const URL: string = 'http://localhost:3000/api'


export const dateParser = (date: string): string => {
  const fecha = new Date(date)
  const año = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();
  const agregarCero = (numero: number): string | number => {
    return numero < 10 ? `0${numero}` : numero;
  };
  const fechaFormateada = `${agregarCero(dia)}/${agregarCero(mes)}/${año}`;
  return fechaFormateada

}