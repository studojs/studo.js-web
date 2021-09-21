import { useMessage } from 'naive-ui';
import { Channel, Message, Topic } from 'studo.js';
import { Ref } from 'vue';
import { useI18n } from 'vue-i18n';

export function useAction(component: Ref<Channel | Topic | Message>) {
  const message = useMessage();
  const { t } = useI18n();

  return async function (action: string) {
    let copyText = '';
    if (action === 'SHARE') copyText = component.value.shareText;
    else if (action === 'COPYTEXT' && 'text' in component.value)
      copyText = component.value.text;
    if (copyText) {
      await navigator.clipboard.writeText(copyText);
      message.info(t('copied'));
    }
    await component.value.sendActions(action);
  };
}
