<?php declare (strict_types = 1);
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

namespace Diana\FirstModule\Setup\Patch\Data;

use Magento\Cms\Model\PageFactory;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Cms\Model\BlockFactory;
use Magento\Framework\Setup\Patch\PatchVersionInterface;

/**
 * Class AddCmsPageAndBlock
 * @package Diana\FirstModule\Setup\Patch\Data
 */
class AddCmsPageAndBlock implements DataPatchInterface, PatchVersionInterface
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
     * @var BlockFactory
     */
    private $blockFactory;

    /**
     * @param ModuleDataSetupInterface $moduleDataSetup
     * @param PageFactory $pageFactory
     */
    public function __construct(
        ModuleDataSetupInterface $moduleDataSetup,
        PageFactory $pageFactory,
        BlockFactory $blockFactory
    ) {
        $this->moduleDataSetup = $moduleDataSetup;
        $this->pageFactory = $pageFactory;
        $this->blockFactory = $blockFactory;
    }

    /**
     * {@inheritdoc}
     */
    public function apply()
    {
        $newCmsStaticBlock = [
            'title' => 'CMS Block with Setup Patch for CMS Page',
            'identifier' => 'cms-block-setup-patch-for-cms-page',
            'content' => '<div class="cms-terms">CMS Block with Setup Patch for CMS Page</div>',
            'is_active' => 1,
            'stores' => \Magento\Store\Model\Store::DEFAULT_STORE_ID
        ];

        $pageData = [
            'title' => 'Custom CMS Page via setup patch with CMS Block',
            'page_layout' => '1column',
            'meta_keywords' => 'Custom CMS Page via setup patch with CMS Block Meta Keywords',
            'meta_description' => 'Custom CMS Page via setup patch with CMS Block Meta Description',
            'identifier' => 'cms-page-via-setup-patch-with-block',
            'content_heading' => 'Custom CMS Page with CMS Block',
            'content' => '<h1>Custom CMS Page via setup patch with CMS Block Content.</h1> <div>{{block class="Magento\Cms\Block\Block" block_id="cms-block-setup-patch-for-cms-page"}}</div>',
            'layout_update_xml' => '',
            'url_key' => 'cms-page-via-setup-patch-with-block',
            'is_active' => 1,
            'stores' => [0, 1],
            'sort_order' => 0,
        ];

        $this->moduleDataSetup->startSetup();
        /** @var \Magento\Cms\Model\Block $block */
        $block = $this->blockFactory->create();
        $block->setData($newCmsStaticBlock)->save();

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
    public static function getVersion()
    {
        return '2.0.0';
    }

    /**
     * {@inheritdoc}
     */
    public function getAliases()
    {
        return [];
    }
}

