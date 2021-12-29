import { useMessage } from 'naive-ui';
import { Channel, Message, Topic } from 'studo.js';
import { computed, Ref, toRef } from 'vue';
import { useRouter } from 'vue-router';
import { useClientStore } from '../store';

type Component = Channel | Topic | Message;

/**
 * Composition API for sending chat actions
 * @param props Component props
 * @param prop key that contains either a channel, topic or message
 */
export function useAction<
  Props extends Record<Prop, Component> & Record<string, any>,
  Prop extends keyof Props
>(props: Props, prop: Prop) {
  const router = useRouter();
  const message = useMessage();
  const store = useClientStore();
  const component: Ref<Component> = toRef(props, prop);

  const actions = computed(() =>
    component.value.actionIds.map((id) => {
      const action = store.client.cache.chatActions.get(id);
      return {
        label: action?.text || id,
        value: id,
        disabled: !!action?.nextActionIds.length,
      };
    })
  );

  async function sendAction(action: string) {
    // Redirect to private message channel locally
    if (action === 'STARTPRIVATEMESSAGING') {
      const url = new URL(
        component.value.actionParameters.STARTPRIVATEMESSAGING
      );
      const channelId = url.searchParams.get('channel');
      if (channelId)
        router.push({ name: 'chat', params: { channel: channelId } });
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
      message.info('Kopiert');
      return;
    }

    // Send any other action
    await component.value.sendActions(action);
  }

  return { actions, sendAction };
}
