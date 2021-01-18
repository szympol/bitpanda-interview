import { onBeforeUnmount, ref, Ref } from '@vue/composition-api';
import { useIntervalFn } from '@vueuse/core';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

export default function useDateInterval(updateTime: string): {
  timeDiff: Ref<string>
  } {
  const getTimeDiffBetweenCurrentAndUpdateDate = (updateTimeParam: string)
    : string => formatDistanceToNowStrict(parseISO(updateTimeParam));

  const fiveMinutesInterval = 1000;
  const timeDiff = ref(getTimeDiffBetweenCurrentAndUpdateDate(updateTime));

  const { pause } = useIntervalFn(() => {
    timeDiff.value = getTimeDiffBetweenCurrentAndUpdateDate(updateTime);
  }, fiveMinutesInterval);

  onBeforeUnmount(() => {
    pause();
  });

  return {
    timeDiff,
  };
}
