// controller/productsController.js
export const softDeleteProduct = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const product = await prisma.product.update({
            where: { id },
            data: { deletedAt: new Date() }
        })
        res.json({ message: 'Product moved to recycle bin.', product })
        } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to delete product' })
        }
    }
    