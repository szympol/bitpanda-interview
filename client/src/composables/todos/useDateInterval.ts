import {
  onBeforeUnmount, ref, Ref, watch,
} from '@vue/composition-api';
import { useIntervalFn } from '@vueuse/core';
import { formatDistanceToNow, parseISO } from 'date-fns';

const oneMinuteInterval = 60000;

const getTimeDiffBetweenCurrentAndUpdateDate = (updateTimeParam: string)
    : string => formatDistanceToNow(parseISO(updateTimeParam),
  { addSuffix: true });

const getTime = (oldDate:Ref<string>) => (newDate: string):void => {
  const old = oldDate;

  old.value = newDate;
};

export default function useDateInterval(initialDate: string): {
  timeDiff: Ref<string>
  getLastUpdateTime: (newDate: string) => void
  } {
  const currentUpdateDate = ref(initialDate);
  const timeDiff = ref(getTimeDiffBetweenCurrentAndUpdateDate(currentUpdateDate.value));

  const getLastUpdateTime: (newDate: string) => void = getTime(currentUpdateDate);

  watch(():string => currentUpdateDate.value,
    (currentUpdateTime):void => {
      timeDiff.value = getTimeDiffBetweenCurrentAndUpdateDate(currentUpdateTime);
    });

  const { pause } = useIntervalFn(() => {
    timeDiff.value = getTimeDiffBetweenCurrentAndUpdateDate(currentUpdateDate.value);
  }, oneMinuteInterval);

  onBeforeUnmount(() => {
    pause();
  });

  return {
    timeDiff,
    getLastUpdateTime,
  };
}
