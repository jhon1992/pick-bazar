import React, { useState } from 'react';
import TextArea from '@/components/ui/forms/text-area';
import {
  orderMessageFromAtom,
  orderMessageAtom,
  orderMessageToAtom,
} from '@/store/checkout';
import { useAtom } from 'jotai';
import Input from '../ui/forms/input';
import { useTranslation } from 'react-i18next';
import { Switch } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import Label from '../ui/label';
import { Tooltip } from '../ui/tooltip';
import { InfoIcon } from '../icons/info-icon';

function OrderMessage({ count, label }: { count: number; label: string }) {
  const { t } = useTranslation('common');
  const [message, setMessage] = useAtom(orderMessageAtom);
  const [messageTo, setTo] = useAtom(orderMessageToAtom);
  const [messageFrom, setFrom] = useAtom(orderMessageFromAtom);

  const [enabled, setEnabled] = useState(false);

  return (
    <div className="bg-light p-5 shadow-700 md:p-8">
      <div className="mb-5 flex items-center justify-between md:mb-8">
        <div className="flex items-center space-x-3 rtl:space-x-reverse md:space-x-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-base text-light lg:text-xl">
            {count}
          </span>
          <p className="text-lg capitalize text-heading lg:text-xl">{label}</p>
        </div>
      </div>
      <div className="block">
        <div className="mb-6 flex items-center gap-x-4">
          <Switch
            checked={enabled}
            onChange={setEnabled}
            //disabled={disabled}
            className={`${
              enabled ? 'bg-accent' : 'bg-gray-300'
            } relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none ${
              enabled! ? 'cursor-not-allowed bg-[#EEF1F4]' : ''
            }`}
            dir="ltr"
            id={'anonymous'}
          >
            <span className="sr-only">Enable</span>
            <span
              className={`${
                enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-light transition-transform`}
            />
          </Switch>

          <Label className="flex text-body-dark font-semibold text-sm leading-none mb-0">
            {'Anónimo, sin firma en la dedicatoria'}
            <Tooltip
              content={
                'Activando esta opción su dedicatoria no llevará nombre como firma.'
              }
            >
              <span className="ltr:ml-1 rtl:mr-1 text-base-dark/40 shrink-0">
                <InfoIcon className="w-3.5 h-3.5" />
              </span>
            </Tooltip>
          </Label>
        </div>

        <div className="mb-6 flex flex-row">
          <Input
            //@ts-ignore
            className="flex-1"
            //label={t('text-to')}
            placeholder={t('text-to')}
            value={messageTo}
            name="orderTo"
            onChange={(e) => setTo(e.target.value)}
            variant="outline"
          />
        </div>
        <div className="mb-6 flex flex-row">
          <Input
            //@ts-ignore
            className="flex-1"
            //label={t('text-from')}
            placeholder={t('text-from')}
            value={messageFrom}
            name="orderFrom"
            onChange={(e) => setFrom(e.target.value)}
            variant="outline"
          />
        </div>
        <TextArea
          //@ts-ignore
          label={t('text-message')}
          value={message}
          name="orderNote"
          onChange={(e) => setMessage(e.target.value)}
          variant="outline"
        />
      </div>
    </div>
  );
}

export default OrderMessage;
