// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import '@openzeppelin/contracts/utils/Strings.sol';

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract RecycleChain {
    uint256 public productCounter;
    address payable public owner;

    constructor() {
        productCounter = 0;
        owner = payable(msg.sender);
    }

    enum ProductStatus {
        MANUFACTURED,
        SOLD,
        RETURNED,
        RECYCLED
    }

    struct Product {
        uint256 id;
        string name;
        uint256 quantity;
        address manufacturer;
        ToxicItem[] toxicItems;
    }

    struct ToxicItem {
        string name;
        uint256 weight;
    }

    struct ProductItem {
        string id;
        uint256 productId;
        ProductStatus status;
    }

    struct Manufacturer {
        string name;
        string location;
        string contact;
    }

    mapping(uint256 => Product) public products;
    mapping(string => ProductItem) public productItems;
    mapping(address => string[]) public inventory;
    mapping(address => Manufacturer) public manufacturers;

    event ProductCreated(uint256 productId, string name, address manufacturer);
    event ToxicItemCreated(uint256 productId, string name, uint256 weight);
    event ProductItemsAdded(string[] itemIds, uint256 productId);
    event ProductItemsStatusChanged(string[] itemIds, ProductStatus status);
    event ManufacturerRegistered(
        address manufacturer,
        string name,
        string location,
        string contact
    );

    function registerManufacturer(
        string memory _name,
        string memory _location,
        string memory _contact
    ) public {
        require(bytes(_name).length > 0, 'Manufacturer name cannot be empty');
        require(
            bytes(manufacturers[msg.sender].name).length == 0,
            'Manufacturer already registered'
        );

        Manufacturer memory newManufacturer = Manufacturer({
            name: _name,
            location: _location,
            contact: _contact
        });

        manufacturers[msg.sender] = newManufacturer;
        emit ManufacturerRegistered(msg.sender, _name, _location, _contact);
    }

    function addProduct(
        string memory _name,
        string[] memory toxicNames,
        uint256[] memory toxicWeights
    ) public {
        require(bytes(_name).length > 0, 'Product name cannot be empty');
        require(
            toxicNames.length == toxicWeights.length,
            'Toxic items array length mismatch'
        );

        require(
            bytes(manufacturers[msg.sender].name).length > 0,
            'Manufacturer not registered'
        );

        productCounter++;

        uint256 productId = productCounter;

        Product storage newProduct = products[productId];
        newProduct.id = productId;
        newProduct.name = _name;
        newProduct.quantity = 0;
        newProduct.manufacturer = msg.sender;

        emit ProductCreated(productId, _name, msg.sender);

        for (uint256 i = 0; i < toxicNames.length; i++) {
            ToxicItem memory toxicItem = ToxicItem({
                name: toxicNames[i],
                weight: toxicWeights[i]
            });

            products[productId].toxicItems.push(toxicItem);

            emit ToxicItemCreated(productId, toxicNames[i], toxicWeights[i]);
        }
    }

    function addProductItems(uint256 _productId, uint256 _quantity) public {
        require(
            _quantity <= 10,
            'Cannot add more than 10 product items at a time.'
        );

        require(
            msg.sender == products[_productId].manufacturer,
            'Only the product manufacturer can add product items.'
        );

        require(
            products[_productId].id == _productId,
            'Product does not exist.'
        );

        string[] memory newProductItemIds = new string[](_quantity);

        for (uint256 i = 0; i < _quantity; i++) {
            string memory itemId = string(
                abi.encodePacked(
                    Strings.toString(_productId),
                    '-',
                    Strings.toString(products[_productId].quantity + i + 1)
                )
            );

            ProductItem memory newItem = ProductItem({
                id: itemId,
                productId: _productId,
                status: ProductStatus.MANUFACTURED
            });

            productItems[itemId] = newItem;
            inventory[msg.sender].push(itemId);
            newProductItemIds[i] = itemId;
        }

        products[_productId].quantity += _quantity;

        emit ProductItemsAdded(newProductItemIds, _productId);
    }

    function sellProductItems(string[] memory itemIds) public {
        for (uint256 i = 0; i < itemIds.length; i++) {
            string memory itemId = itemIds[i];
            uint256 productId = productItems[itemId].productId;

            require(
                productItems[itemId].productId != 0,
                'Product item does not exist.'
            );

            // Check that the sender is the manufacturer of the product
            require(
                msg.sender == products[productId].manufacturer,
                'Only the product manufacturer can sell product items.'
            );

            require(
                productItems[itemIds[i]].status == ProductStatus.MANUFACTURED,
                'Product Item cannot be sold.'
            );

            productItems[itemIds[i]].status = ProductStatus.SOLD;
        }

        emit ProductItemsStatusChanged(itemIds, ProductStatus.SOLD);
    }

    function returnProductItems(string[] memory itemIds) public {
        for (uint256 i = 0; i < itemIds.length; i++) {
            uint256 productId = productItems[itemIds[i]].productId;

            require(
                productItems[itemIds[i]].status == ProductStatus.SOLD,
                'Product Item cannot be returned.'
            );

            // Check that the sender is the manufacturer of the product
            require(
                msg.sender == products[productId].manufacturer,
                'Only the product manufacturer can sell product items.'
            );

            productItems[itemIds[i]].status = ProductStatus.RETURNED;
        }
        emit ProductItemsStatusChanged(itemIds, ProductStatus.RETURNED);
    }

    function recycleProductItems(string[] memory itemIds) public {
        for (uint256 i = 0; i < itemIds.length; i++) {
            uint256 productId = productItems[itemIds[i]].productId;

            require(
                productItems[itemIds[i]].status == ProductStatus.RETURNED,
                'Product Item cannot be recycled.'
            );

            // Check that the sender is the manufacturer of the product
            require(
                msg.sender == products[productId].manufacturer,
                'Only the product manufacturer can sell product items.'
            );

            productItems[itemIds[i]].status = ProductStatus.RECYCLED;
        }
        emit ProductItemsStatusChanged(itemIds, ProductStatus.RECYCLED);
    }
}
