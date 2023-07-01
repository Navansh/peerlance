import type { User } from 'firebase/auth'
import { ref } from 'vue'

export const signedInUser = ref<User | null>(null)
