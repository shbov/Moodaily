import {addRecord} from './Record';
import {Emotion} from '../Enums/Emotion';

export const fakeDate = async () => {
  for (let i = 0; i < 2; i++) {
    await addRecord({
      id: i,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      title: 'Ура, каникулы!',
      emotions: [Emotion.happy],
      description:
        'Сегодня был последний день занятий, к счастью, я смогла все сдать и могу спокойно отдыхать! Я и не ожидала, что время так быстро пролетит. Сейчас я уже начала составлять планы, надеюсь, что смогу их продержатся',
    });
  }
};
