import { Channel, Message, Topic } from 'studo.js';

export async function useAction(
  action: string,
  component: Channel | Topic | Message
) {
  let copyText = '';
  if (action === 'SHARE') copyText = component.shareText;
  else if (action === 'COPYTEXT' && 'text' in component)
    copyText = component.text;
  if (copyText) {
    await navigator.clipboard.writeText(copyText);
    return 'copied';
  }
  await component.sendActions(action);
}
