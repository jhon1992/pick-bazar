import { RadioGroup } from '@headlessui/react';
import { useAtom } from 'jotai';
import DeliveryInformationCard from './delivery-information-card';
import { deliveryTimeAtom } from '@/store/checkout';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useSettings } from '@/framework/settings';
import { isArray, isEmpty } from 'lodash';

interface ScheduleProps {
  label: string;
  className?: string;
  count?: number;
}

const schedules: any = [
  { title: 'Envio a domicilio', description: '09:00 AM - 09.00 PM' },
  { title: 'Recojo en tienda', description: 'Sucursal en Trujillo' },
];

export const DeliveryInformationGrid: React.FC<ScheduleProps> = ({
  label,
  className,
  count,
}) => {
  const { t } = useTranslation('common');
  /*
  const {
    settings: { deliveryTime: schedules },
  }: any = useSettings();
*/
  const [selectedSchedule, setSchedule] = useAtom(deliveryTimeAtom);
  useEffect(() => {
    if (!isEmpty(schedules) && isArray(schedules)) {
      setSchedule(schedules[0]);
    }
  }, [schedules]);
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

      {schedules && schedules?.length ? (
        <RadioGroup value={selectedSchedule} onChange={setSchedule}>
          <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {schedules?.map((schedule: any, idx: number) => (
              <RadioGroup.Option value={schedule} key={idx}>
                {({ checked }) => (
                  <DeliveryInformationCard
                    checked={checked}
                    schedule={schedule}
                  />
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
export default DeliveryInformationGrid;
