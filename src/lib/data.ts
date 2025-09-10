// Mock data for ShipFex dashboard

export const kpiData = [
  { title: 'Orders Today', value: '1,250', change: '+15.2%', changeType: 'increase' },
  { title: 'Revenue Today', value: '$45,820', change: '+18.7%', changeType: 'increase' },
  { title: 'Pending Shipments', value: '82', change: '-2.1%', changeType: 'decrease' },
  { title: 'On-time Shipping', value: '98.5%', change: '+0.5%', changeType: 'increase' },
];

export const chartData = [
  { date: 'Mon', orders: 120 },
  { date: 'Tue', orders: 180 },
  { date: 'Wed', orders: 150 },
  { date: 'Thu', orders: 210 },
  { date: 'Fri', orders: 250 },
  { date: 'Sat', orders: 190 },
  { date: 'Sun', orders: 90 },
];

export const recentActivity = [
  { id: 'ORD-001', type: 'New Order', user: 'Seller ABC', details: '$250.00 from Shopify', time: '2m ago' },
  { id: 'INV-002', type: 'Stock Alert', user: 'System', details: 'SKU SHIRT-M-BLK is low', time: '15m ago' },
  { id: 'SHIP-003', type: 'Shipped', user: 'Worker A', details: 'Order #8821 to CA', time: '1h ago' },
  { id: 'RTN-004', type: 'Return', user: 'Customer', details: 'Order #8799', time: '3h ago' },
  { id: 'INB-005', type: 'Inbound', user: 'Warehouse Mgr', details: 'ASN #2024-12 received', time: '5h ago' },
];

export const inventoryData = [
    { id: 'SF-TS-BLK-S', name: 'ShipFex T-Shirt Black S', stock: 120, allocated: 15, available: 105, warehouse: 'WH-EAST-1' },
    { id: 'SF-TS-BLK-M', name: 'ShipFex T-Shirt Black M', stock: 250, allocated: 45, available: 205, warehouse: 'WH-EAST-1' },
    { id: 'SF-TS-WHT-L', name: 'ShipFex T-Shirt White L', stock: 80, allocated: 5, available: 75, warehouse: 'WH-WEST-1' },
    { id: 'SF-MUG-11', name: 'ShipFex Mug 11oz', stock: 300, allocated: 22, available: 278, warehouse: 'WH-CENTRAL-1' },
    { id: 'SF-HAT-GRY', name: 'ShipFex Hat Grey', stock: 50, allocated: 30, available: 20, warehouse: 'WH-WEST-1' },
    { id: 'SF-TS-BLK-XL', name: 'ShipFex T-Shirt Black XL', stock: 0, allocated: 0, available: 0, warehouse: 'WH-EAST-1' },
    { id: 'SF-HOOD-NAV-M', name: 'ShipFex Hoodie Navy M', stock: 150, allocated: 18, available: 132, warehouse: 'WH-CENTRAL-1' },
];

export const orderData = [
  { id: 'SFX-1001', customer: 'John Doe', date: '2024-07-29', total: '$45.50', status: 'Pending', channel: 'Shopify' },
  { id: 'SFX-1002', customer: 'Jane Smith', date: '2024-07-29', total: '$120.00', status: 'Processing', channel: 'Amazon' },
  { id: 'SFX-1003', customer: 'Peter Jones', date: '2024-07-28', total: '$25.00', status: 'Shipped', channel: 'Shopify' },
  { id: 'SFX-1004', customer: 'Mary Johnson', date: '2024-07-28', total: '$89.99', status: 'Delivered', channel: 'Manual' },
  { id: 'SFX-1005', customer: 'Chris Lee', date: '2024-07-27', total: '$250.10', status: 'Shipped', channel: 'WooCommerce' },
  { id: 'SFX-1006', customer: 'Patricia Williams', date: '2024-07-27', total: '$12.00', status: 'Cancelled', channel: 'Shopify' },
  { id: 'SFX-1007', customer: 'Robert Brown', date: '2024-07-26', total: '$55.00', status: 'Delivered', channel: 'Amazon' },
];

export const shipmentData = [
    { id: 'SHP-9001', orderId: 'SFX-1003', carrier: 'UPS', tracking: '1Z999AA10123456784', status: 'In Transit', date: '2024-07-28' },
    { id: 'SHP-9002', orderId: 'SFX-1004', carrier: 'USPS', tracking: '9400100000000000000000', status: 'Delivered', date: '2024-07-28' },
    { id: 'SHP-9003', orderId: 'SFX-1005', carrier: 'FedEx', tracking: '784629469383', status: 'In Transit', date: '2024-07-27' },
    { id: 'SHP-9004', orderId: 'SFX-1007', carrier: 'UPS', tracking: '1Z999AA101234569999', status: 'Delivered', date: '2024-07-26' },
    { id: 'SHP-9005', orderId: 'SFX-1008', carrier: 'DHL', tracking: '4837261947', status: 'Pending Pickup', date: '2024-07-29' },
];

export const inboundData = [
    { id: 'ASN-2024-01', from: 'Supplier A', status: 'Received', expected: '2024-07-25', received: '2024-07-25' },
    { id: 'ASN-2024-02', from: 'Supplier B', status: 'Receiving', expected: '2024-07-28', received: null },
    { id: 'ASN-2024-03', from: 'Supplier A', status: 'In Transit', expected: '2024-08-01', received: null },
];

export const returnsData = [
    { id: 'RMA-0101', orderId: 'SFX-0988', customer: 'Emily White', status: 'Authorized', date: '2024-07-28' },
    { id: 'RMA-0102', orderId: 'SFX-0991', customer: 'Michael Green', status: 'Received', date: '2024-07-27' },
    { id: 'RMA-0103', orderId: 'SFX-0995', customer: 'Sarah Black', status: 'Restocked', date: '2024-07-26' },
    { id: 'RMA-0104', orderId: 'SFX-0999', customer: 'David Blue', status: 'Pending Authorization', date: '2024-07-29' },
];

type Integration = {
    name: string;
    description: string;
    logo: string | null;
    connected: boolean;
};

type IntegrationCategory = {
    title: string;
    integrations: Integration[];
};

export const integrationCategories: IntegrationCategory[] = [
    {
        title: "Ecommerce Platforms & Marketplaces",
        integrations: [
            { name: "Shopify", description: "Streamline Shopify order fulfillment.", logo: "/icons/integrations/shopify.svg", connected: true },
            { name: "Shopify Plus", description: "Power Shopify Plus order fulfillment.", logo: "/icons/integrations/shopify-plus.svg", connected: false },
            { name: "Amazon", description: "Fulfill Amazon orders seamlessly.", logo: "/icons/integrations/amazon.svg", connected: true },
            { name: "BigCommerce", description: "Automate BigCommerce order fulfillment.", logo: "/icons/integrations/bigcommerce.svg", connected: false },
            { name: "Ebay", description: "Automate Ebay order fulfillment.", logo: "/icons/integrations/ebay.svg", connected: false },
            { name: "Magento", description: "A single platform for all your commerce.", logo: "/icons/integrations/magento.svg", connected: false },
            { name: "Squarespace", description: "Simplify Squarespace order fulfillment.", logo: "/icons/integrations/squarespace.svg", connected: false },
            { name: "Square", description: "Automate Square order fulfillment.", logo: "/icons/integrations/square.svg", connected: false },
            { name: "Walmart", description: "Streamline Walmart order fulfillment.", logo: "/icons/integrations/walmart.svg", connected: false },
            { name: "Wix", description: "Optimize Wix order fulfillment.", logo: "/icons/integrations/wix.svg", connected: false },
            { name: "WooCommerce", description: "Scale WooCommerce order fulfillment.", logo: "/icons/integrations/woocommerce.svg", connected: false },
            { name: "Netsuite", description: "The world’s most deployed cloud ERP solution.", logo: "/icons/integrations/netsuite.svg", connected: false },
            { name: "TikTok", description: "Fulfill TikTok Shop and FBT orders.", logo: "/icons/integrations/tiktok.svg", connected: false },
            { name: "SHEIN Marketplace", description: "Fulfill your SHEIN orders effortlessly.", logo: "/icons/integrations/shein.svg", connected: false },
            { name: "Temu", description: "Marketplace for low-cost products.", logo: "/icons/integrations/temu.svg", connected: false },
            { name: "Macy’s", description: "Leading fashion, home, and beauty retailer.", logo: "/icons/integrations/macys.svg", connected: false },
        ]
    },
    {
        title: "Ecommerce Operations, Inventory & Order Management",
        integrations: [
            { name: "Brightpearl", description: "Operations platform for omnichannel merchants.", logo: "/icons/integrations/brightpearl.svg", connected: false },
            { name: "Brij", description: "QR codes for first-party data capture.", logo: "/icons/integrations/brij.svg", connected: false },
            { name: "Sourcify", description: "Cut costs and speed up sourcing.", logo: "/icons/integrations/sourcify.svg", connected: false },
            { name: "NoFraud", description: "Block fraud, not good orders.", logo: "/icons/integrations/nofraud.svg", connected: false },
            { name: "ChannelApe", description: "Operational solutions to help brands scale.", logo: "/icons/integrations/channelape.svg", connected: false },
            { name: "ChannelEngine", description: "Reach millions on 700+ sales channels.", logo: "/icons/integrations/channelengine.svg", connected: false },
            { name: "Cin7", description: "Centralize all your sales channel operations.", logo: "/icons/integrations/cin7.svg", connected: false },
            { name: "Cogsy", description: "Your extra Head of Operations.", logo: "/icons/integrations/cogsy.svg", connected: false },
            { name: "Cymbio", description: "Automated marketplace and dropshipping.", logo: "/icons/integrations/cymbio.svg", connected: false },
            { name: "Extensiv", description: "Sell direct-to-everywhere.", logo: "/icons/integrations/extensiv.svg", connected: false },
            { name: "Flxpoint", description: "Integrate any vendor, optimize every order.", logo: "/icons/integrations/flxpoint.svg", connected: false },
            { name: "Fulfil", description: "ERP for D2C & wholesale merchants.", logo: "/icons/integrations/fulfil.svg", connected: false },
            { name: "GS1 US", description: "Power your supply chain with GS1 US.", logo: "/icons/integrations/gs1us.svg", connected: false },
            { name: "Inventory Planner", description: "Smarter inventory forecasting.", logo: "/icons/integrations/inventory-planner.svg", connected: false },
            { name: "Linnworks", description: "Connect and automate multichannel operations.", logo: "/icons/integrations/linnworks.svg", connected: false },
            { name: "Logicbroker", description: "Launch and scale drop ship programs.", logo: "/icons/integrations/logicbroker.svg", connected: false },
            { name: "Order Desk", description: "Automate and customize retail workflows.", logo: "/icons/integrations/order-desk.svg", connected: false },
            { name: "PackageBee", description: "Connect your custom store to ShipBob.", logo: "/icons/integrations/packagebee.svg", connected: false },
            { name: "Pipe17", description: "Automate omnichannel order operations.", logo: "/icons/integrations/pipe17.svg", connected: false },
            { name: "Purple Dot", description: "Pre-order management made simple.", logo: "/icons/integrations/purple-dot.svg", connected: false },
            { name: "Prime Penguin", description: "Your eCommerce integration platform.", logo: "/icons/integrations/prime-penguin.svg", connected: false },
            { name: "Shypyard", description: "Agile forecasting and planning.", logo: "/icons/integrations/shypyard.svg", connected: false },
            { name: "SPS Commerce", description: "Meet your retailer’s EDI requirements.", logo: "/icons/integrations/sps-commerce.svg", connected: false },
            { name: "WebBee Global", description: "Multi-channel order management.", logo: "/icons/integrations/webbee-global.svg", connected: false },
            { name: "Zentail", description: "Be where your buyers are.", logo: "/icons/integrations/zentail.svg", connected: false },
            { name: "Zignify Global Product Sourcing", description: "Worldwide sourcing experts.", logo: "/icons/integrations/zignify.svg", connected: false },
        ]
    },
    {
        title: "Returns Management Platforms",
        integrations: [
            { name: "AfterShip", description: "Enhance post-purchase experience.", logo: "/icons/integrations/aftership.svg", connected: false },
            { name: "Corso", description: "Automate returns, exchanges, and warranties.", logo: "/icons/integrations/corso.svg", connected: false },
            { name: "Happy Returns", description: "World-class return experiences.", logo: "/icons/integrations/happy-returns.svg", connected: false },
            { name: "Loop Returns", description: "Top returns app for Shopify brands.", logo: "/icons/integrations/loop-returns.svg", connected: false },
            { name: "ReturnGO", description: "Automate post-purchase process.", logo: "/icons/integrations/returngo.svg", connected: false },
            { name: "ReturnLogic", description: "Intelligent returns and warranty management.", logo: "/icons/integrations/returnlogic.svg", connected: false },
            { name: "Redo", description: "Free returns and exchanges automation.", logo: "/icons/integrations/redo.svg", connected: false },
        ]
    },
    {
        title: "Freight & Shipping Solutions",
        integrations: [
            { name: "ECU Worldwide", description: "Simplify international logistics.", logo: "/icons/integrations/ecu-worldwide.svg", connected: false },
            { name: "OpenBorder", description: "Cross-border commerce made easy.", logo: "/icons/integrations/openborder.svg", connected: false },
            { name: "Anvyl", description: "Control your production process.", logo: "/icons/integrations/anvyl.svg", connected: false },
            { name: "EasyPost", description: "Multi-carrier shipping API.", logo: "/icons/integrations/easypost.svg", connected: false },
            { name: "FlavorCloud", description: "Global expansion made simple.", logo: "/icons/integrations/flavorcloud.svg", connected: false },
            { name: "Freightos", description: "Easy and reliable freight services.", logo: "/icons/integrations/freightos.svg", connected: false },
            { name: "Shippo", description: "Best rates from top carriers.", logo: "/icons/integrations/shippo.svg", connected: false },
            { name: "ShipStation", description: "Leading web-based shipping software.", logo: "/icons/integrations/shipstation.svg", connected: false },
        ]
    },
    {
        title: "Ecommerce Marketing, CRM & Customer Support",
        integrations: [
            { name: "CartHook", description: "One-click post-purchase offers.", logo: "/icons/integrations/carthook.svg", connected: false },
            { name: "Fera", description: "Product reviews for e-commerce sellers.", logo: "/icons/integrations/fera.svg", connected: false },
            { name: "Attentive", description: "AI-powered SMS & email marketing.", logo: "/icons/integrations/attentive.svg", connected: false },
            { name: "CheckoutChamp", description: "Boost your sales by 20%+.", logo: "/icons/integrations/checkoutchamp.svg", connected: false },
            { name: "ethos", description: "Engagement and loyalty platform.", logo: "/icons/integrations/ethos.svg", connected: false },
            { name: "Grow", description: "No-code business intelligence.", logo: "/icons/integrations/grow.svg", connected: false },
            { name: "Zipify", description: "AI-powered upsells for higher revenue.", logo: "/icons/integrations/zipify.svg", connected: false },
            { name: "GetReviews.ai", description: "Automate review collection.", logo: "/icons/integrations/getreviews-ai.svg", connected: false },
            { name: "Daasity", description: "Omnichannel data & analytics.", logo: "/icons/integrations/daasity.svg", connected: false },
            { name: "EcoCart", description: "Offset emissions & grow sustainably.", logo: "/icons/integrations/ecocart.svg", connected: false },
            { name: "Gorgias", description: "Centralized customer support.", logo: "/icons/integrations/gorgias.svg", connected: false },
            { name: "Justuno", description: "Personalization & pop-ups.", logo: "/icons/integrations/justuno.svg", connected: false },
            { name: "Klaviyo", description: "Marketing automation platform.", logo: "/icons/integrations/klaviyo.svg", connected: false },
            { name: "Lucky Orange", description: "Conversion growth tool.", logo: "/icons/integrations/lucky-orange.svg", connected: false },
            { name: "OctaneAI", description: "Marketing fuel for brands.", logo: "/icons/integrations/octaneai.svg", connected: false },
            { name: "Okendo", description: "Reviews & UGC platform.", logo: "/icons/integrations/okendo.svg", connected: false },
            { name: "Omnisend", description: "Email, SMS & Messenger in one.", logo: "/icons/integrations/omnisend.svg", connected: false },
            { name: "Ordergroove", description: "Subscription management.", logo: "/icons/integrations/ordergroove.svg", connected: false },
            { name: "PageFly", description: "Build high-converting stores.", logo: "/icons/integrations/pagefly.svg", connected: false },
            { name: "Polytomic", description: "Sync ShipBob data anywhere.", logo: "/icons/integrations/polytomic.svg", connected: false },
            { name: "Quartile", description: "Cross-channel ad platform.", logo: "/icons/integrations/quartile.svg", connected: false },
            { name: "Recharge", description: "Subscription management solution.", logo: "/icons/integrations/recharge.svg", connected: false },
            { name: "Route", description: "Premier post-purchase experience.", logo: "/icons/integrations/route.svg", connected: false },
            { name: "Rise.ai", description: "Gift card & store credit solution.", logo: "/icons/integrations/rise-ai.svg", connected: false },
            { name: "Saras Analytics", description: "Unified data platform.", logo: "/icons/integrations/saras-analytics.svg", connected: false },
            { name: "Sezzle", description: "Buy now, pay later.", logo: "/icons/integrations/sezzle.svg", connected: false },
            { name: "Shop Circle", description: "Shopify store solutions.", logo: "/icons/integrations/shop-circle.svg", connected: false },
            { name: "Simplr", description: "24/7 US-based support outsourcing.", logo: "/icons/integrations/simplr.svg", connected: false },
            { name: "Skio", description: "Shopify subscription platform.", logo: "/icons/integrations/skio.svg", connected: false },
            { name: "Smartrr", description: "Subscriptions for modern brands.", logo: "/icons/integrations/smartrr.svg", connected: false },
            { name: "Subify", description: "Seamless subscription management.", logo: "/icons/integrations/subify.svg", connected: false },
            { name: "TalentPop", description: "Outsource customer service.", logo: "/icons/integrations/talentpop.svg", connected: false },
            { name: "Throne", description: "Free influencer marketing channel.", logo: "/icons/integrations/throne.svg", connected: false },
            { name: "Triple Whale", description: "Better e-commerce data.", logo: "/icons/integrations/triple-whale.svg", connected: false },
            { name: "Tydo", description: "Free analytics for Shopify.", logo: "/icons/integrations/tydo.svg", connected: false },
            { name: "Yotpo", description: "Retention marketing platform.", logo: "/icons/integrations/yotpo.svg", connected: false },
            { name: "Yuma AI", description: "AI-powered support agent.", logo: "/icons/integrations/yuma-ai.svg", connected: false },
            { name: "Zaius", description: "AI recommendations & personalization.", logo: "/icons/integrations/zaius.svg", connected: false },
            { name: "Zip", description: "Buy now, pay later solution.", logo: "/icons/integrations/zip.svg", connected: false },
        ]
    },
    {
        title: "Ecommerce Custom Packaging & Design Solutions",
        integrations: [
            { name: "Arka", description: "Affordable custom packaging.", logo: "/icons/integrations/arka.svg", connected: false },
            { name: "Flush Packaging", description: "Protective packaging solutions.", logo: "/icons/integrations/flush-packaging.svg", connected: false },
            { name: "Noissue.", description: "Eco-friendly packaging.", logo: "/icons/integrations/noissue.svg", connected: false },
            { name: "Packhelp", description: "Custom packaging for all volumes.", logo: "/icons/integrations/packhelp.svg", connected: false },
            { name: "Packlane", description: "Ready-to-ship branded boxes.", logo: "/icons/integrations/packlane.svg", connected: false },
        ]
    },
    {
        title: "Branding, Marketing & Web Development Agencies",
        integrations: [
            { name: "adQuadrant", description: "Full-funnel marketing powerhouse.", logo: "/icons/integrations/adquadrant.svg", connected: false },
            { name: "Pirawna", description: "Amazon eCommerce growth experts.", logo: "/icons/integrations/pirawna.svg", connected: false },
            { name: "Pact", description: "Strategic brand growth partner.", logo: "/icons/integrations/pact.svg", connected: false },
            { name: "Crstl", description: "Fast and simple EDI.", logo: "/icons/integrations/crstl.svg", connected: false },
            { name: "Roswell", description: "Shopify Plus Partner agency.", logo: "/icons/integrations/roswell.svg", connected: false },
            { name: "Blanka", description: "Build your brand with private label.", logo: "/icons/integrations/blanka.svg", connected: false },
            { name: "Sharma Brands", description: "DTC brand growth experts.", logo: "/icons/integrations/sharma-brands.svg", connected: false },
            { name: "Logical Position", description: "PPC, SEO & growth solutions.", logo: "/icons/integrations/logical-position.svg", connected: false },
            { name: "BVACCEL", description: "DTC brand incubator.", logo: "/icons/integrations/bvaccel.svg", connected: false },
            { name: "Envoy", description: "Branding & product development.", logo: "/icons/integrations/envoy.svg", connected: false },
            { name: "Hawke Media", description: "Outsourced CMO services.", logo: "/icons/integrations/hawke-media.svg", connected: false },
            { name: "Priceless Consulting", description: "Veteran-owned design agency.", logo: "/icons/integrations/priceless-consulting.svg", connected: false },
            { name: "MuteSix", description: "DTC performance marketing.", logo: "/icons/integrations/mutesix.svg", connected: false },
            { name: "ROI Revolution", description: "PPC, SEO, CRO & more.", logo: "/icons/integrations/roi-revolution.svg", connected: false },
            { name: "SeaMonster Studios", description: "Creative design & dev partners.", logo: "/icons/integrations/seamonster-studios.svg", connected: false },
        ]
    },
    {
        title: "Accounting, Tax & Financing",
        integrations: [
            { name: "Airwallex", description: "Global business accounts.", logo: "/icons/integrations/airwallex.svg", connected: false },
            { name: "Avalara", description: "Automated tax compliance.", logo: "/icons/integrations/avalara.svg", connected: false },
            { name: "Finaloop", description: "Ecommerce accounting services.", logo: "/icons/integrations/finaloop.svg", connected: false },
            { name: "Stenn", description: "Global trade finance.", logo: "/icons/integrations/stenn.svg", connected: false },
            { name: "Settle", description: "Inventory & financing platform.", logo: "/icons/integrations/settle.svg", connected: false },
            { name: "Avask", description: "Global ecommerce tax experts.", logo: "/icons/integrations/avask.svg", connected: false },
            { name: "Slope", description: "Flexible financing.", logo: "/icons/integrations/slope.svg", connected: false },
            { name: "Bookkeeper360", description: "Professional accounting team.", logo: "/icons/integrations/bookkeeper360.svg", connected: false },
            { name: "Canusa Logistics", description: "Canadian customs brokerage.", logo: "/icons/integrations/canusa-logistics.svg", connected: false },
            { name: "Clearco", description: "Fast, affordable funding.", logo: "/icons/integrations/clearco.svg", connected: false },
            { name: "DSP Insurance Services", description: "Insurance solutions.", logo: "/icons/integrations/dsp-insurance.svg", connected: false },
            { name: "Firstbase.io", description: "Launch your US business.", logo: "/icons/integrations/firstbase-io.svg", connected: false },
            { name: "Kickfurther", description: "Pre-sell inventory financing.", logo: "/icons/integrations/kickfurther.svg", connected: false },
            { name: "Mercury", description: "Banking for ecommerce.", logo: "/icons/integrations/mercury.svg", connected: false },
            { name: "OFX", description: "Global money transfers.", logo: "/icons/integrations/ofx.svg", connected: false },
            { name: "Passport", description: "International growth support.", logo: "/icons/integrations/passport.svg", connected: false },
            { name: "Rho", description: "Business finance management.", logo: "/icons/integrations/rho.svg", connected: false },
            { name: "SimplyVAT", description: "International VAT compliance.", logo: "/icons/integrations/simplyvat.svg", connected: false },
            { name: "StartSure", description: "Inventory insurance.", logo: "/icons/integrations/startsure.svg", connected: false },
            { name: "TaxJar", description: "Sales tax automation.", logo: "/icons/integrations/taxjar.svg", connected: false },
            { name: "Taxually", description: "Simplified global taxes.", logo: "/icons/integrations/taxually.svg", connected: false },
            { name: "Worldpay", description: "Global payment solutions.", logo: "/icons/integrations/worldpay.svg", connected: false },
            { name: "ZonKeepers", description: "Australian e-commerce taxation.", logo: "/icons/integrations/zonkeepers.svg", connected: false },
            { name: "Zyla", description: "Multi-currency accounts.", logo: "/icons/integrations/zyla.svg", connected: false },
        ]
    }
];

// Deprecated, use integrationCategories instead
export const integrations = [
    { name: 'Shopify', description: 'Sync products, orders, and inventory with your Shopify store.', logo: '/icons/shopify.svg', connected: true },
    { name: 'Amazon', description: 'Connect your Seller Central account for FBM and FBA prep.', logo: '/icons/amazon.svg', connected: true },
    { name: 'WooCommerce', description: 'Integrate your WooCommerce-powered site in minutes.', logo: '/icons/woocommerce.svg', connected: false },
    { name: 'BigCommerce', description: 'Automate fulfillment for your BigCommerce store.', logo: '/icons/bigcommerce.svg', connected: false },
    { name: 'ShipStation', description: 'Connect to ShipStation for more shipping options.', logo: '/icons/shipstation.svg', connected: false },
    { name: 'API', description: 'Build custom integrations with our powerful REST API.', logo: null, connected: true },
];