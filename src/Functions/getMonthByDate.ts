export const getMonthByDate = (month: number): string => {
  const months =
    'январь,февраль,март,апрель,май,июнь,июль,август,сентябрь,октябрь,ноябрь,декабрь'.split(
      ',',
    );

  const ans = months[month];
  return ans.charAt(0).toUpperCase() + ans.slice(1);
};
