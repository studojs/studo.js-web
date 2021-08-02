<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script lang="ts">
import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/vue3';

export default {
  name: 'Calendar',
  components: {
    FullCalendar,
  },
  setup() {
    return {
      calendarOptions: {
        plugins: [timeGridPlugin],
        initialView: 'timeGridWeek',
        slotMinTime: '07:00:00',
        slotMaxTime: '23:59:59',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: '',
        },
        nowIndicator: true,
        editable: true,
        selectable: true,
        dayMaxEvents: true,
      },
    };
  },
};
</script>

<style scoped>
</style>