import { useMessage } from 'naive-ui';
import { Channel, Message, Topic } from 'studo.js';
import { Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

/**
 * Composition API for sending chat actions
 * @param component Channel, Topic or Message
 */
export function useAction(component: Ref<Channel | Topic | Message>) {
  const router = useRouter();
  const message = useMessage();
  const { t } = useI18n();

  return async function (action: string) {
    // Redirect to private message channel locally
    if (action === 'STARTPRIVATEMESSAGING') {
      const url = new URL(
        component.value.actionParameters.STARTPRIVATEMESSAGING
      );
      const channelId = url.searchParams.get('channel');
      if (channelId) router.push({ name: 'channel', params: { channelId } });
      return;
    }

    // Copy text locally
    let copyText = '';
    if (action === 'SHARE') {
      copyText = component.value.shareText;
    } else if (action === 'COPYTEXT' && 'text' in component.value) {
      copyText = component.value.text;
    }
    if (copyText) {
      await navigator.clipboard.writeText(copyText);
      message.info(t('copied'));
      return;
    }

    // Send any other action
    await component.value.sendActions(action);
  };
}
