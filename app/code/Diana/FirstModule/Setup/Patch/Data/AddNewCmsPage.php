<?php declare (strict_types = 1);
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

namespace Diana\FirstModule\Setup\Patch\Data;

use Magento\Cms\Model\PageFactory;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Framework\Setup\Patch\DataPatchInterface;

/**
 * Class AddNewCmsPage
 * @package Diana\FirstModule\Setup\Patch\Data
 */
class AddNewCmsPage implements DataPatchInterface
{
    /**
     * ModuleDataSetupInterface
     *
     * @var ModuleDataSetupInterface
     */
    private $moduleDataSetup;

    /**
     * @var PageFactory
     */
    private $pageFactory;

    /**
     * @param ModuleDataSetupInterface $moduleDataSetup
     * @param PageFactory $pageFactory
     */
    public function __construct(
        ModuleDataSetupInterface $moduleDataSetup,
        PageFactory $pageFactory
    ) {
        $this->moduleDataSetup = $moduleDataSetup;
        $this->pageFactory = $pageFactory;
    }

    /**
     * {@inheritdoc}
     */
    public function apply()
    {

        $pageData = [
            'title' => 'Custom CMS Page via setup patch', // cms page title
            'page_layout' => '1column', // cms page layout
            'meta_keywords' => 'Custom CMS Page via setup patch Meta Keywords', // cms page meta keywords
            'meta_description' => 'Custom CMS Page via setup patch Meta Description', // cms page meta description
            'identifier' => 'cms-page-via-setup-patch', // cms page identifier
            'content_heading' => 'Rohan Custom CMS Page', // cms page content heading
            'content' => '<h1>Custom CMS Page via setup patch Content</h1>', // cms page content
            'layout_update_xml' => '', // cms page layout xml
            'url_key' => 'cms-page-via-setup-patch', // cms page url key
            'is_active' => 1, // status enabled or disabled
            'stores' => [0, 1], // You can set store id single or multiple values in array.
            'sort_order' => 0, // cms page sort order
        ];

        $this->moduleDataSetup->startSetup();
        $this->pageFactory->create()->setData($pageData)->save();
        $this->moduleDataSetup->endSetup();
    }

    /**
     * {@inheritdoc}
     */
    public static function getDependencies()
    {
        return [];
    }

    /**
     * {@inheritdoc}
     */
    public function getAliases()
    {
        return [];
    }
}
