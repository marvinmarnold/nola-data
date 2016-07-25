import { Questions } from '../common/collections/questions.js'

const questions = [
  {
    text: "How is the air in the region you selected",
    isActive: true
  },
  {
    text: "How is the water quality in this region?",
    isActive: true
  },
  {
    text: "How bad is pollution and visible debris?",
    isActive: true
  },
  {
    text: "Is there a high incidence of environmentally caused morbidity and other health issues?",
    isActive: true
  },
]
export function seedQuestions() {
  if(Questions.find().count() === 0) {
    console.log('No Questions in DB. Beginning to seed...');
    _.each(questions, question => {
      Questions.insert(question)
    })
  }
}
