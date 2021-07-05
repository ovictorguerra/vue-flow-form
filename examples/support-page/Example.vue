<template>
  <div>

    <flow-form
      ref="flowform"
      v-on:complete="onComplete"
      v-bind:language="language"
      v-bind:progressbar="false"
      v-bind:standalone="true"
    >
      <question 
        v-for="(question, index) in questions" 
        v-bind="question" 
        v-bind:key="'m' + index" 
        v-model="question.model"
      >
      </question>
      
      <!-- Custom content for the Complete/Submit screen slots in the FlowForm component -->
      <template v-slot:complete>
        <div class="f-section-wrap">
          <div v-if="questions[0].model === 'technical_issue'">
            <span class="f-tagline">Enviar solicitação &gt; Passo 3/3</span>
            <div v-if="loading">
              <span class="fh2">Por favor aguarde, enviando...</span>
            </div>
            <div v-else>
              <span class="fh2">O protocolo de atendimento é: {{ getTicket() }}</span>
              <p class="f-description"><span> Obrigado 😊. Nosso time de suporte entrarar em contato em até 12 horas.</span></p>
            </div>
          </div>
          <div v-else>
            <span class="f-tagline">Página de Suporte &gt; Status</span>
            <div v-if="loading">
              <span class="fh2">Por favor aguarde, analisando...</span>
            </div>
            <div v-else>
              <span  class="fh2">Boas notícias - Você será atendido. {{ formatTicket(questions[2].model) }} is being processed!😉</span>
              <p class="f-description"><span>Tenha um ótimo dia!</span></p>
            </div>
          </div>
        </div>  
      </template>
      <!-- We've overriden the default "complete" slot content -->
      <template v-slot:completeButton>
        <div class="f-submit">
          <!-- Leave empty to hide default submit button -->
        </div>
      </template>
    </flow-form>
  </div>
</template>

<script>
  /*
    Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
    https://www.ditdot.hr/en
  */

  // Import necessary components and classes
  import FlowForm from '../../src/components/FlowForm.vue'
  import Question from '../../src/components/Question.vue'
  import LanguageModel from '../../src/models/LanguageModel'
  // If using the npm package, use the following line instead of the ones above.
  // import FlowForm, Question, { LanguageModel } from '@ditdot-dev/vue-flow-form'

  export default {
    name: 'example',
    components: {
      FlowForm,
      Question
    },
    data() {
      return {
        loading: false,
        completed: false,
        language: new LanguageModel(),
        questions: [
          {
            type: 'multiplechoice',
            id: 'multiple_choice',
            tagline: 'Bem Vindo ao suporte da Yub!',
            title: 'Olá 👋, como podemos lhe ajudar hoje?',
            multiple: false,
            required: true,
            helpTextShow: false,
            options: [
              {
                label: 'Eu tenho uma dúvida técnica',
                value: 'technical_issue'
              },
              {
                label: 'Eu gostaria de chegar o status da minha solicitação',
                value: 'enter_ticket'
              },
            ],
            jump: {
              technical_issue: 'technical_issue', 
              enter_ticket: 'enter_ticket'
            },
            model: '',
          },
          {
            type: 'multiplechoice',
            id: 'technical_issue',
            tagline: 'Solicitação Enviada > Passo 1/3',
            title: 'Você já leu nosso FAQ de dúvidas técnicas?',
            multiple: false,
            required: true,
            helpTextShow: false,
            description: "Aqui você encontra mais respostas",
            descriptionLink: [
              {
                url: '#',
                text: 'FAQs',
                target: '_self'
              }
            ],
            options: [          
              {
                label: 'Sim, porém não se aplica a minha situação',
                value: 'faq_no'
              }
            ],
            jump: {
              faq_no: 'faq_no'
            },
            model: '',
          },
          {
            type: 'text',
            id: 'enter_ticket',
            tagline: 'Página de Supórte > Status da Solicitação',
            title: 'Por favor entre com seu código de 6 dígitos.',
            subtitle: 'Você recebeu quando realizou a solicitação de suporte.',
            multiple: false, 
            required: true,
            mask: '#-#-#-#-#-#',
            placeholder: '#-#-#-#-#-#',
            jump: {
              _other: '_submit'
            },
            model: ''
          },
          {
            type: 'longtext',
            id: "faq_no",
            tagline: 'Enviar Solicitação > Passo 2/3',
            title: 'Por favor descreva seu problema.',
            required: true,
            placeholder: 'Relate os fatos aqui...',
            model: ''
          }
        ]
      }
    },
    methods: {
      /* eslint-disable-next-line no-unused-vars */
      onComplete(completed, questionList) {
        // This method is called whenever the "completed" status is changed.
        this.completed = completed

        // Set `submitted` to true so the form knows not to allow back/forward
        // navigation anymore.
        this.$refs.flowform.submitted = true

        this.onSendData()
      },
      
      onSendData() {
        const self = this
        const data = this.getData()

        this.loading = true
        
        /*
          You can use Fetch API to send the data to your server, eg.:

          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
        */

        setTimeout(() => {
          self.loading = false
        }, 1500)
      },

      getData() {
        const data = {
          questions: [],
          answers: []
        }
    
        this.questions.forEach(question => {
          if (question.title) {
            let answer = question.model
            if (Array.isArray(answer)) {
              answer = answer.join(', ')
            }

            data.questions.push(question.title)
            data.answers.push(answer)
          }
        })
    
        return data
      },

      formatTicket(ticket) {
        return ticket && ticket.replace(/-/g, '')
      },

      getTicket() {
        return Math.floor(Math.random() * (999999 - 100000) + 100000).toString()
      }
    }
  }
</script>

<style lang="css">
  @import '../../src/assets/css/themes/theme-minimal.css';
  /* If using the npm package, use the following lines instead of the one above */
  /* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css'; */
  /* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-green.css'; */
</style>