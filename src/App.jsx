import { InputLabel, MenuItem, Select, Button, IconButton } from "@mui/material"
import { Close } from "@mui/icons-material"
import { useState, useMemo } from "react"
import "./App.css"

const customers = [
    { name: "walmart", id: 1 },
    { name: "target", id: 2 },
    { name: "taco bell", id: 3 },
]

const locations = [
    { customerId: 1, siteNumber: 1 },
    { customerId: 1, siteNumber: 2 },
    { customerId: 1, siteNumber: 3 },
    { customerId: 1, siteNumber: 4 },
    { customerId: 1, siteNumber: 5 },
    { customerId: 2, siteNumber: 1 },
    { customerId: 2, siteNumber: 2 },
    { customerId: 2, siteNumber: 3 },
    { customerId: 2, siteNumber: 4 },
    { customerId: 2, siteNumber: 5 },
    { customerId: 3, siteNumber: 1 },
    { customerId: 3, siteNumber: 2 },
    { customerId: 3, siteNumber: 3 },
    { customerId: 3, siteNumber: 4 },
    { customerId: 3, siteNumber: 5 },
]

const items = [
    { name: "camera-A", ourCost: 100, price: 200, itemId: 111 },
    { name: "camera-B", ourCost: 150, price: 300, itemId: 222 },
    { name: "signage", ourCost: 200, price: 400, itemId: 333 },
]

const deals = [
    { customerId: 1, itemId: 222, reducedCost: 50, reducedPrice: 150 },
    { customerId: 2, itemId: 111, reducedCost: 75, reducedPrice: 175 },
    { customerId: 3, itemId: 333, reducedCost: 100, reducedPrice: 250 },
]

function App() {
    const [customerId, setCustomerId] = useState(0)
    const [siteId, setSiteId] = useState(0)
    const [productId, setProductId] = useState(0)
    const [price, setPrice] = useState(0)
    const [ourCost, setOurCost] = useState(0)

    const getSites = (customerId) => {
        return locations.filter((i) => i.customerId === customerId)
    }

    const getProductPrice = (customerId, productId) => {
        const standardPrice = items
            .filter((i) => i.itemId === productId)
            .map((i) => ({ isReduced: false, price: i.price, ourCost: i.ourCost }))
        const customerDeals =
            deals
                .filter((i) => i.customerId === customerId)
                ?.map((i) => ({
                    isReduced: true,
                    price: i.reducedPrice,
                    ourCost: i.reducedCost,
                })) ?? []
        return [...standardPrice, ...customerDeals]
    }

    const customerSites = useMemo(() => getSites(customerId), [customerId])
    const customerProductPrices = useMemo(
        () => getProductPrice(customerId, productId),
        [customerId, productId]
    )
    const selectedItem = useMemo(() => {
        if (productId) {
            return items.find((i) => i.itemId === productId)
        }
        return { name: "", ourCost: 0, price: 0 }
    }, [productId])

    const handlePriceChange = (event) => {
        setPrice(event.target.value)
        setOurCost(customerProductPrices.find((i) => i.price === event.target.value).ourCost)
    }

    const setCustomer = (value) => {
        setCustomerId(value)
        setSiteId("")
        setProductId("")
        setPrice("")
        setOurCost("")
    }

    const setSite = (value) => {
        setSiteId(value)
        setProductId("")
        setPrice("")
        setOurCost("")
    }

    const setProduct = (value) => {
        setProductId(value)
        setPrice("")
        setOurCost("")
    }

    return (
        <div
            className="page-container"
            style={{
                fontFamily: "arial",
            }}
        >
            <div>
                <h1>Customer Deals Input Example</h1>
            </div>
            <div
                className="dropdowns"
                style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
            >
                <div style={{ padding: 4 }}>
                    <InputLabel sx={{ width: 1 }}>Customer</InputLabel>
                    <Select
                        endAdornment={
                            <IconButton
                                onClick={() => setCustomer("")}
                                sx={{ display: customerId ? "" : "none" }}
                            >
                                <Close />
                            </IconButton>
                        }
                        sx={{
                            width: 1,
                            "& .MuiSelect-iconOutlined": { display: customerId ? "none" : "" },
                        }}
                        value={customerId}
                        onChange={(e) => setCustomer(e.target.value)}
                    >
                        {customers.map((i) => (
                            <MenuItem key={i.id} value={i.id}>
                                {i.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                {!!customerId && (
                    <div style={{ padding: 4 }}>
                        <InputLabel sx={{ width: 1 }}>Site</InputLabel>
                        <Select
                            endAdornment={
                                <IconButton
                                    onClick={() => setSite("")}
                                    sx={{ display: siteId ? "" : "none" }}
                                >
                                    <Close />
                                </IconButton>
                            }
                            sx={{
                                width: 1,
                                "& .MuiSelect-iconOutlined": { display: siteId ? "none" : "" },
                            }}
                            value={siteId}
                            onChange={(e) => setSite(e.target.value)}
                        >
                            {customerSites.map((i) => (
                                <MenuItem key={i.siteNumber} value={i.siteNumber}>
                                    {i.siteNumber}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                )}
                {!!customerId && !!siteId && (
                    <div style={{ padding: 4 }}>
                        <InputLabel sx={{ width: 1 }}>Product</InputLabel>
                        <Select
                            endAdornment={
                                <IconButton
                                    onClick={() => setProduct("")}
                                    sx={{ display: productId ? "" : "none" }}
                                >
                                    <Close />
                                </IconButton>
                            }
                            sx={{
                                width: 1,
                                "& .MuiSelect-iconOutlined": { display: productId ? "none" : "" },
                            }}
                            value={productId}
                            onChange={(e) => setProduct(e.target.value)}
                        >
                            {items.map((i) => (
                                <MenuItem key={i.itemId} value={i.itemId}>
                                    {i.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                )}
                {!!customerId && !!siteId && !!productId && (
                    <div style={{ padding: 4 }}>
                        <InputLabel sx={{ width: 1 }}>Customer Price</InputLabel>
                        <Select
                            endAdornment={
                                <IconButton
                                    onClick={() => setPrice("")}
                                    sx={{ display: price ? "" : "none" }}
                                >
                                    <Close />
                                </IconButton>
                            }
                            sx={{
                                width: 1,
                                "& .MuiSelect-iconOutlined": { display: price ? "none" : "" },
                            }}
                            value={price}
                            onChange={handlePriceChange}
                        >
                            {customerProductPrices.map((i) => (
                                <MenuItem key={i.price} value={i.price}>
                                    ${i.price}
                                    {i.isReduced && " - Reduced"}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                )}
            </div>
            {!!customerId && !!siteId && !!productId && !!price && (
                <div
                    style={{
                        padding: 10,
                        border: "1px solid gray",
                        borderRadius: 10,
                        marginTop: "3rem",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            padding: 10,
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: 5,
                            fontSize: 20,
                        }}
                    >
                        <div>Selected product:</div>
                        <div>{selectedItem.name}</div>
                        <div>Our Cost:</div>
                        <div>${ourCost}</div>
                        <div>Customer Price:</div>
                        <div>${price}</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <Button variant="contained">Submit</Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
