import {addRecord} from './Record';
import {Emotion} from '../Types/Emotion';

export const generateFakeData = async () => {
  for (let i = 0; i < 2; i++) {
    await addRecord({
      id: i + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      title: 'Ура, каникулы!',
      emotions: [Emotion.happy, Emotion.chill, Emotion.joyful],
      description:
        'Сегодня был последний день занятий, к счастью, я смогла все сдать и могу спокойно отдыхать! Я и не ожидала, что время так быстро пролетит. Сейчас я уже начала составлять планы, надеюсь, что смогу их продержатся',
    });
  }
};
