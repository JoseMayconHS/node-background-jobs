export interface SetItemData {
  key: string, value: string
}

export interface InMemoryLib {
  setItem(data: SetItemData): Promise<void>
  getItem(key: string): Promise<string | null>
}
