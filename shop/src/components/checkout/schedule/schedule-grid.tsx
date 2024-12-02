import { RadioGroup } from '@headlessui/react';
import { useAtom } from 'jotai';
import ScheduleCard from './schedule-card';
import { deliveryTimeAtom } from '@/store/checkout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useSettings } from '@/framework/settings';
import { isArray, isEmpty } from 'lodash';
//import DatePicker from '@/components/ui/date-picker';
import { useForm } from 'react-hook-form';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';
import { format } from 'date-fns';
import { es, ru } from 'date-fns/locale';

import { useRouter } from 'next/router';
import Label from '@/components/ui/label';

interface ScheduleProps {
  label: string;
  className?: string;
  count?: number;
}

export const ScheduleGrid: React.FC<ScheduleProps> = ({
  label,
  className,
  count,
}) => {
  const { t } = useTranslation('common');
  const {
    settings: { deliveryTime: schedules },
  }: any = useSettings();
  const { locale } = useRouter();
  const [selectedSchedule, setSchedule] = useAtom(deliveryTimeAtom);
  useEffect(() => {
    if (!isEmpty(schedules) && isArray(schedules)) {
      setSchedule(schedules[0]);
    }
  }, [schedules]);

  const { control } = useForm<any>();
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className={className}>
      <div className="mb-5 flex items-center justify-between md:mb-8">
        <div className="flex items-center space-x-3 rtl:space-x-reverse md:space-x-4">
          {count && (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-base text-light lg:text-xl">
              {count}
            </span>
          )}
          <p className="text-lg capitalize text-heading lg:text-xl">{label}</p>
        </div>
      </div>

      <div className="mb-6 flex-col">
        <Label>{t('Escoge una fecha de entrega')}</Label>
        <DatePicker
          required
          locale="es"
          //dateFormat="dd/MM/yyyy"
          className="border border-border-base"
          //locale={locale}
          selected={startDate}
          //maxDate={new Date('08-30-2024')}
          minDate={new Date()}
          startDate={new Date()}
          //endDate={new Date()}
          onChange={(date: Date) => setStartDate(date)}
          customInput={
            <div
              className={twMerge(
                classNames(
                  'border border-border-base px-4 h-12 flex items-center w-full rounded transition duration-300 ease-in-out text-heading text-sm cursor-pointer',
                ),
              )}
            >
              {format(new Date(startDate), "eeee dd 'de' MMMM 'del' yyyy", {
                locale: es,
              })}
            </div>
          } // use custom input to control input field focus
        />
      </div>

      {schedules && schedules?.length ? (
        <RadioGroup value={selectedSchedule} onChange={setSchedule}>
          <Label>{t('Seleccione el horario de entrega')}</Label>
          <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {schedules?.map((schedule: any, idx: number) => (
              <RadioGroup.Option value={schedule} key={idx}>
                {({ checked }) => (
                  <ScheduleCard checked={checked} schedule={schedule} />
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <span className="relative rounded border border-border-200 bg-gray-100 px-5 py-6 text-center text-base">
            {t('text-no-delivery-time-found')}
          </span>
        </div>
      )}
    </div>
  );
};
export default ScheduleGrid;
