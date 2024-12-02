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
//Recipient
function OrderRecipient({ count, label }: { count?: number; label: string }) {
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
          <Input
            //@ts-ignore
            className="flex-1"
            //label={t('text-recipient')}
            placeholder={t('text-name-of-the-recipient')}
            value={recipientName}
            name="orderRecipientName"
            onChange={(e) => setName(e.target.value)}
            variant="outline"
          />
        </div>
        <div className="mb-6 flex flex-row">
          <PhoneInput
            country="pe"
            value={recipientPhone}
            onChange={(e) => setPhone(e)}
            //name="orderRecipientPhone"
            disabled={false}
            disableDropdown={true}
            inputClass="!p-0 ltr:!pr-4 rtl:!pl-4 ltr:!pl-14 rtl:!pr-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-heading !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base !rounded focus:!border-accent !h-12"
            dropdownClass="focus:!ring-0 !border !border-border-base !shadow-350"
          />
        </div>
        <TextArea
          //@ts-ignore
          label={t('text-note')}
          value={recipientNote}
          name="orderRecipientNote"
          onChange={(e) => setNote(e.target.value)}
          variant="outline"
        />
      </div>
    </div>
  );
}

export default OrderRecipient;
