import { IUseDate } from '@hooks/useDate';
import { CalendarHeader } from '@molecules/CalendarHeader';
import { CalendarDayOfWeek } from '@molecules/CalendarDayOfWeek';
import { CalendarDays } from '@molecules/CalendarDays';

type Props = Pick<IUseDate, 'selectMonth' | 'prevMonth' | 'nextMonth'>;

export const CalendarContent = ({
  selectMonth,
  prevMonth,
  nextMonth,
}: Props) => {
  return (
    <>
      <CalendarHeader
        selectMonth={selectMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <CalendarDayOfWeek />
      <CalendarDays selectMonth={selectMonth} />
    </>
  );
};
