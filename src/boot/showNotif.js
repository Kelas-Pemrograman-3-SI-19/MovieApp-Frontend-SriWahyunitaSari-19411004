import { Notify } from 'quasar'
import { boot } from 'quasar/wrappers'

const show = (message, jenis) => {
  Notify.create({
    message: message,
    color: jenis,
    timeout: 2000
  })
}

export default boot(({ app }) => {
  app.config.globalProperties.$showNotif = show
})
