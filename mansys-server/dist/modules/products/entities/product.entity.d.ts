import { Inventory } from 'src/modules/inventory/entities/inventory.entity';
import { BillOfMaterial } from '../../billOfMaterial/entities/billOfMaterial.entity';
import { Category } from '../../category/category.entity';
import { DeliveryNoteItem } from 'src/modules/delivery-note/entities/delivery-note-item.entity';
import { ReceivingNoteItem } from '../../receiving-note/entities/receiving-note-item.entity';
export declare class Product {
    id: number;
    name: string;
    description: string;
    supplier: string;
    cost: number;
    price: number;
    createDate: Date;
    category: any;
    productCategory: Category;
    inventories: Inventory[];
    deliveryNoteItems: DeliveryNoteItem[];
    receivingNoteItems: ReceivingNoteItem[];
    billOfMaterials: BillOfMaterial[];
}
