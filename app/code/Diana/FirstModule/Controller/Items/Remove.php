<?php
namespace Diana\FirstModule\Controller\Items;

use \Magento\Checkout\Model\Cart;
use \Magento\Framework\App\Action\Action;
use \Magento\Framework\App\Action\Context;
use \Magento\Checkout\Model\Session;
use \Magento\Framework\Controller\Result\RedirectFactory;

class Remove extends Action
{
    /**
     * @var Session
     */
    protected $checkoutSession;

    /**
     * @var Cart
     */
    protected $cart;

    /**
     * @var RedirectFactory
     */
    protected $redirectFactory;

    /**
     * @param Context $context
     * @param Session $checkoutSession
     * @param Cart $cart
     * @param RedirectFactory $redirectFactory
     */
    public function __construct(
        Context $context,
        Session $checkoutSession,
        Cart $cart,
        RedirectFactory $redirectFactory
    ) {
        $this->checkoutSession = $checkoutSession;
        $this->cart = $cart;
        $this->resultRedirectFactory = $redirectFactory;

        parent::__construct(
            $context
        );
    }

    public function execute()
    {
        $this->_emptyShoppingCart();
    }

    /**
     * @return \Magento\Framework\App\ResponseInterface
     */
    protected function _emptyShoppingCart()
    {
        try {
            $this->cart->truncate()->save();
        } catch (\Magento\Framework\Exception\LocalizedException $exception) {
            $this->messageManager->addErrorMessage($exception->getMessage());
        } catch (\Exception $exception) {
            $this->messageManager->addExceptionMessage($exception, __('We can\'t update the shopping cart.'));
        }

        return $this->_redirect('checkout/cart');
    }
}
