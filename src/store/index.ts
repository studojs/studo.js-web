export { useChatStore } from './chat';
export { useClientStore } from './client';
export { useSettingsStore } from './settings';

// export function sortChannels() {
//   // Sort clone workaround due to proxy/ref errors
//   const clone = channelsRef.clone().sort((a, b) => {
//     if ([a, b].every(({ id }) => id.startsWith('course'))) {
//       return collator.compare(
//         a.name.replace(/^(VO|VU|KU|UE) /, ''),
//         b.name.replace(/^(VO|VU|KU|UE) /, '')
//       );
//     }
//     return b.sortScore - a.sortScore || collator.compare(a.name, b.name);
//   });
//   channelsRef.clear();
//   for (const [id, channel] of clone.entries()) {
//     channelsRef.set(id, channel);
//   }
// }

// export function sortMessages() {
//   const clone = messagesRef.clone().sort((a, b) => b.sortScore - a.sortScore);
//   messagesRef.clear();
//   for (const [id, message] of clone.entries()) {
//     messagesRef.set(id, message);
//   }
// }

// export async function loadTopics(channelId = channelIdRef.value) {
//   if (!channelId || !_client) return;
//   if (!_client.connected) await _client.once('ready');

//   _client.topics.clear();
//   _client.tabs.clear();
//   topicsRef.clear();

//   await _client.channels.subscribe(channelId);
//   const tab = await _client.once('tabUpdate');
//   await tab.subscribe();

//   if (isPrivateChannel.value) {
//     const topic = await _client.once('topicUpdate');
//     router.replace({ params: { topicId: topic.id } });
//   }
// }

// export async function loadMessages(topicId = topicIdRef.value) {
//   if (!topicId || !_client) return;
//   if (!_client.connected) await _client.once('ready');

//   messagesRef.clear();
//   _client.messages.clear();
//   await _client.topics.subscribe(topicId);
// }
