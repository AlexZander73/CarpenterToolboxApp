export interface SyncService {
  push(): Promise<void>
  pull(): Promise<void>
}

export class DisabledSyncService implements SyncService {
  async push() {
    return
  }
  async pull() {
    return
  }
}
