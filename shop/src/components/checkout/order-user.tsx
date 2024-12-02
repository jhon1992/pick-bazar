import React from 'react';
import TextArea from '@/components/ui/forms/text-area';
import {
  orderRecipientNoteAtom,
  orderRecipientNameAtom,
  orderRecipientPhoneAtom,
} from '@/store/checkout';
import { useAtom } from 'jotai';
import Input from '../ui/forms/input';
import { useTranslation } from 'react-i18next';
import PhoneInput from '../ui/forms/phone-input';
import Select from '../ui/select/select';
//receives
function OrderUser({ count, label }: { count?: number; label: string }) {
  const { t } = useTranslation('common');
  const [recipientNote, setNote] = useAtom(orderRecipientNoteAtom);
  const [recipientName, setName] = useAtom(orderRecipientNameAtom);
  const [recipientPhone, setPhone] = useAtom(orderRecipientPhoneAtom);

  return (
    <div className="bg-light p-5 shadow-700 md:p-8">
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
      <div className="block">
        <div className="mb-6 flex flex-row">
          <Select
            className="flex-1"
            //name="shippingClass"
            //control={control}
            //getOptionLabel={(option: any) => option.name}
            //getOptionValue={(option: any) => option.id}
            //options={shippingClasses!}
            //label={t('form:input-label-shipping-class')}
            //toolTipText={t('form:input-tooltip-shipping-class')}
            //control={undefined}
            defaultValue={{
              value: 'DNI',
              label: 'Documento Nacional de Identidad (DNI) ',
            }}
            options={[
              { value: 'DNI', label: 'Documento Nacional de Identidad (DNI) ' },
              { value: 'CE', label: 'Carnet de Extranjería (CE)' },
              { value: 'PAS', label: 'Pasaporte (PAS)' },
            ]} // disabled={isNotDefaultSettingsPage}
          />
        </div>

        <div className="mb-6 flex flex-row">
          <Input
            //@ts-ignore
            className="flex-1"
            //label={t('text-recipient')}
            placeholder={t('text-enter-your-document-number')}
            value={recipientName}
            name="orderDocumentNumber"
            //onChange={(e) => setName(e.target.value)}
            variant="outline"
          />
        </div>
        <div className="mb-6 flex flex-row">
          <Input
            //@ts-ignore
            className="flex-1"
            //label={t('text-recipient')}
            placeholder={t('text-your-name')}
            value={recipientName}
            name="orderUserName"
            //onChange={(e) => setName(e.target.value)}
            variant="outline"
          />
        </div>
        <div className="mb-6 flex flex-row">
          <Input
            //@ts-ignore
            className="flex-1"
            //label={t('text-recipient')}
            placeholder={t('text-your-last-names')}
            value={recipientName}
            name="orderUserLastNames"
            //onChange={(e) => setName(e.target.value)}
            variant="outline"
          />
        </div>
      </div>
    </div>
  );
}

export default OrderUser;
