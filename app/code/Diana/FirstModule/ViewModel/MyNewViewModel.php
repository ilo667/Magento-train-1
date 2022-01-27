<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Diana\FirstModule\ViewModel;

use \Magento\Framework\View\Element\Block\ArgumentInterface;
use \Magento\Customer\Block\Account\Customer;

class MyNewViewModel implements ArgumentInterface
{
    /**
     * @var Customer
     */
    protected $customer;

    /**
     * @param Customer $customer
     */
    public function __construct(Customer $customer)
    {
        $this->customer = $customer;
    }

    /**
     * @return bool
     */
    public function customerLoggedIn()
    {
        return $this->customer->customerLoggedIn();
    }

    /**
     * @return mixed
     */
    public function getArrayFromJson()
    {
        $json = '[
  {
    "_id": "61f1122b828e28a8f7f921b4",
    "index": 0
  },
  {
    "_id": "61f1122b99ae36d31a9c1e70",
    "index": 1
  },
  {
    "_id": "61f1122be1bfa8c8adbbceab",
    "index": 2
  },
  {
    "_id": "61f1122bc4caaf5e019d907c",
    "index": 3
  },
  {
    "_id": "61f1122b437a328e0daac6ab",
    "index": 4
  },
  {
    "_id": "61f1122b3ef2319b3d2765b9",
    "index": 5
  },
  {
    "_id": "61f1122b171f23741bd1052c",
    "index": 6
  }
]';
        return json_decode($json, true);
    }
}
