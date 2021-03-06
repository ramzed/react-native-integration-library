import {FilterBuilder, SortOrder} from "abstract-query-builder";
import {ProductItem} from "../../Types/inbuilt";
import {ProductType, TaxNumber} from "../../Types/compilable";
import {Product, ProductGroup} from "../../DataWrappers/inventory/framework";
import executor from "./executor";

/**
 * @class module:inventory.ProductSortOrder
 * @classdesc Класс для сортировки полей в результате запроса.
 * @property {FieldSorter<module:inventory.ProductSortOrder>} uuid - Идентификатор (uuid) товара
 * @property {FieldSorter<module:inventory.ProductSortOrder>} parentUuid - Идентификатор (uuid) родителя товара
 * @property {FieldSorter<module:inventory.ProductSortOrder>} code - Код
 * @property {FieldSorter<module:inventory.ProductSortOrder>} name - Название
 * @property {FieldSorter<module:inventory.ProductSortOrder>} taxNumber - Налоговая ставка
 * @property {FieldSorter<module:inventory.ProductSortOrder>} type - Тип
 * @property {FieldSorter<module:inventory.ProductSortOrder>} price - Цена
 * @property {FieldSorter<module:inventory.ProductSortOrder>} quantity - Количество
 * @property {FieldSorter<module:inventory.ProductSortOrder>} description - Описание
 * @property {FieldSorter<module:inventory.ProductSortOrder>} measureName - Единица измерения
 * @property {FieldSorter<module:inventory.ProductSortOrder>} measurePrecision - Точность измерения
 * @property {FieldSorter<module:inventory.ProductSortOrder>} alcoholByVolume - Крепость алкогольной продукции
 * @property {FieldSorter<module:inventory.ProductSortOrder>} alcoholProductKindCode - Код вида продукции ФСРАР
 * @property {FieldSorter<module:inventory.ProductSortOrder>} tareVolume - Объём тары
 */
export class ProductSortOrder extends SortOrder<ProductSortOrder> {

    uuid = this.addFieldSorter("UUID");
    parentUuid = this.addFieldSorter("PARENT_UUID");
    code = this.addFieldSorter("CODE");
    name = this.addFieldSorter("NAME");
    taxNumber = this.addFieldSorter("TAX_NUMBER");
    type = this.addFieldSorter("TYPE");
    price = this.addFieldSorter("PRICE_OUT");
    quantity = this.addFieldSorter("QUANTITY");
    description = this.addFieldSorter("DESCRIPTION");
    measureName = this.addFieldSorter("MEASURE_NAME");
    measurePrecision = this.addFieldSorter("MEASURE_PRECISION");
    alcoholByVolume = this.addFieldSorter("ALCOHOL_BY_VOLUME");
    alcoholProductKindCode = this.addFieldSorter("ALCOHOL_PRODUCT_KIND_CODE");
    tareVolume = this.addFieldSorter("TARE_VOLUME");

    constructor() {
        super(() => this);
    }

}

/**
 * @class module:inventory.ProductQuery
 * @classdesc Класс для формирования запроса на получение товарных единиц.
 * @property {FieldFilter<string, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} uuid - Идентификатор (uuid) товара
 * @property {FieldFilter<?string, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} parentUuid - Идентификатор (uuid) родителя товара
 * @property {FieldFilter<?string, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} code - Код
 * @property {FieldFilter<string, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} name - Название
 * @property {FieldFilter<module:inventory#TaxNumber, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} taxNumber - Налоговая ставка
 * @property {FieldFilter<module:inventory#ProductType, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} type - Тип
 * @property {FieldFilter<number, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} price - Цена
 * @property {FieldFilter<number, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} quantity - Количество
 * @property {FieldFilter<?string, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} description - Описание
 * @property {FieldFilter<string, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} measureName - Единица измерения
 * @property {FieldFilter<number, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} measurePrecision - Точность измерения
 * @property {FieldFilter<?number, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} alcoholByVolume - Крепость алкогольной продукции
 * @property {FieldFilter<?number, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} alcoholProductKindCode - Код вида продукции ФСРАР
 * @property {FieldFilter<?number, module:inventory.ProductQuery, module:inventory.ProductSortOrder, module:inventory#ProductItem>} tareVolume - Объём тары
 */
export default class ProductQuery extends FilterBuilder<ProductQuery, ProductSortOrder, ProductItem> {

    uuid = this.addFieldFilter<string>("UUID");
    parentUuid = this.addFieldFilter<string>("PARENT_UUID");
    code = this.addFieldFilter<(string | null)>("CODE");
    name = this.addFieldFilter<string>("NAME");
    taxNumber = this.addFieldFilter<TaxNumber>("TAX_NUMBER");
    type = this.addFieldFilter<ProductType>("TYPE");
    price = this.addFieldFilter<number>("PRICE_OUT", (it) => it * 100);
    quantity = this.addFieldFilter<number>("QUANTITY", (it) => it * 1000);
    description = this.addFieldFilter<(string | null)>("DESCRIPTION");
    measureName = this.addFieldFilter<string>("MEASURE_NAME");
    measurePrecision = this.addFieldFilter<number>("MEASURE_PRECISION");
    alcoholByVolume = this.addFieldFilter<(number | null)>("ALCOHOL_BY_VOLUME", (it) => it ? it * 1000 : null);
    alcoholProductKindCode = this.addFieldFilter<(number | null)>("ALCOHOL_PRODUCT_KIND_CODE");
    tareVolume = this.addFieldFilter<(number | null)>("TARE_VOLUME", (it) => it ? it * 1000 : null);

    constructor() {
        super(
            () => this,
            executor(
                "ProductItem",
                (item) => {
                    if (item.hasOwnProperty('quantity')) {
                       return Product.prototype
                    }
                    return ProductGroup.prototype
                }
            )
        );
    }

}