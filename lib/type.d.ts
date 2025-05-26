declare interface ItemType {
  id: string;
  name: string;
  fromDealer: string;
  shelfCount: number;
  stockCount: number;
  reducedCount: number;
  totalCount: number;
  shelfCapacity: string;
  toOrderCount: number;
  onPress?: () => void;
}
