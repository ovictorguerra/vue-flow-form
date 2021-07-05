/*!
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

// Language data store

export default class LanguageModel {
  constructor(options) {
    this.enterKey = 'Enter'
    this.shiftKey = 'Shift'
    this.ok = 'OK'
    this.continue = 'Continue'
    this.skip = 'Próximo'
    this.pressEnter = 'Tecle :enterKey'
    this.multipleChoiceHelpText = 'Escolha todas que julgar necessário'
    this.multipleChoiceHelpTextSingle = 'Escolha somente uma resposta'
    this.otherPrompt = 'Outros'
    this.placeholder = 'Insira sua resposta aqui...'
    this.submitText = 'Enviar'
    this.longTextHelpText = ':shiftKey + :enterKey para quebrar uma linha.'
    this.prev = 'Voltar'
    this.next = 'Próximo'
    this.percentCompleted = ':percent% completo'
    this.invalidPrompt = 'Por favor preencha o campo corretamente!'
    this.thankYouText = 'Obrigado!'
    this.successText = 'Enviado com sucesso!!'
    this.ariaOk = 'Aperte para continuar'
    this.ariaRequired = 'Obrigatório'
    this.ariaPrev = 'Passo Anterior'
    this.ariaNext = 'Próximo passo'
    this.ariaSubmitText = 'Aperte para enviar'
    this.ariaMultipleChoice = 'Aperte :letter para selecionar'
    this.ariaTypeAnswer = 'Escolha sua resposta aqui'
    this.errorAllowedFileTypes = 'Arquivo inválido. Tipos de arquivos permitidos: :fileTypes.'
    this.errorMaxFileSize = 'Tamanho Máximo Atingido. O tamanho máximo permitido é: :size.'
    this.errorMinFiles = 'Insira todos os arquivos necessários. O mínimo permitido é: :min.'
    this.errorMaxFiles = 'Quantidade de arquivos ultrapassa limite. Máximo permite é: :max.'

    Object.assign(this, options || {})
  }

  /**
   * Inserts a new CSS class into the language model string to format the :string
   * Use it in a component's v-html directive: v-html="language.formatString(language.languageString)"
   */
  formatString(string, replacements) {
    return string.replace(/:(\w+)/g, (match, word) => {
      if (this[word]) {
        return '<span class="f-string-em">' + this[word] + '</span>'
      } else if (replacements && replacements[word]) {
        return replacements[word]
      }
      
      return match
    })
  }

  formatFileSize(bytes) {
    const
      units = ['B', 'kB', 'MB', 'GB', 'TB'],
      i = bytes > 0 ? Math.floor(Math.log(bytes) / Math.log(1024)) : 0
      
    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + units[i];
  }
}


