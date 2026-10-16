import { WeddingEvent } from '../config/weddingData';

// Format ISO date to Google Calendar & ICS UTC format: YYYYMMDDTHHMMSSZ
export const formatDateToUTC = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

// Generate direct Google Calendar Event URL
export function getGoogleCalendarUrl(event: WeddingEvent, coupleHashtag: string = "#RohithWedsHaritha"): string {
  const startUTC = formatDateToUTC(event.startTime);
  const endUTC = formatDateToUTC(event.endTime);
  const title = `${event.title} - Rohith & Haritha`;
  const location = `${event.venue}, ${event.landmark}, ${event.city}`;
  const details = `${event.title} - ${coupleHashtag}\n${event.description || ''}\n\nVenue: ${location}\nGoogle Maps: ${event.mapUrl}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startUTC}/${endUTC}`,
    details: details,
    location: location,
    sprop: 'website:rohithwedsharitha.com'
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// Directly open Google Calendar in a new tab / mobile app
export function openGoogleCalendar(event: WeddingEvent, coupleHashtag: string = "#RohithWedsHaritha") {
  const url = getGoogleCalendarUrl(event, coupleHashtag);
  window.open(url, '_blank', 'noopener,noreferrer');
}

// Fallback .ics file download for Apple / Outlook
export function downloadCalendarEvent(event: WeddingEvent, coupleHashtag: string = "#RohithWedsHaritha") {
  const startICS = formatDateToUTC(event.startTime);
  const endICS = formatDateToUTC(event.endTime);
  const nowICS = formatDateToUTC(new Date().toISOString());

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
