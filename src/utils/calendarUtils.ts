import { WeddingEvent } from '../config/weddingData';

export function downloadCalendarEvent(event: WeddingEvent, coupleHashtag: string = "#RohithWedsHaritha") {
  // Convert ISO string to ICS format YYYYMMDDTHHMMSSZ
  const formatDateToICS = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startICS = formatDateToICS(event.startTime);
  const endICS = formatDateToICS(event.endTime);
  const nowICS = formatDateToICS(new Date().toISOString());

  const location = `${event.venue}, ${event.landmark}, ${event.city}`;
  const description = `${event.title} - ${coupleHashtag}\\n${event.description || ''}\\nLocation: ${location}\\nMap: ${event.mapUrl}`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Rohith & Haritha Luxury Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${event.id}-${Date.now()}@rohithwedsharitha.com`,
    `DTSTAMP:${nowICS}`,
    `DTSTART:${startICS}`,
    `DTEND:${endICS}`,
    `SUMMARY:${event.title} - Rohith & Haritha`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Rohith & Haritha Wedding Ceremony Tomorrow',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.id}-rohith-haritha-wedding.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
