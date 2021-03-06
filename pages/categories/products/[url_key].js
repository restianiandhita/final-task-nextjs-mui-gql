/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../../../styles/Home.module.css'
import { useQuery } from '@apollo/client'
import { GET_PRODUCT } from '../service/schema'
import { Button, Box, Paper, experimentalStyled as styled, Grid, CardContent, CardMedia, Typography, Alert, Card } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Image from 'next/image';
import { withApollo } from '../../../lib/apollo/client';
import NavTabs from '../../../components/navbar';
import { useRouter } from 'next/router';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
}));

const Product = () => {
    const [cart, setCart] = useState([]);
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        let cart = localStorage.getItem('cart');
        if (cart === null) {
            setCart([])
        } else {
            let result = JSON.parse(cart) || [];
            setCart(result)
        }
    }, [])

    const router = useRouter();
    console.log('router ',router)
    const { loading, error, data } = useQuery(GET_PRODUCT, {
        variables: {
            urlKey: router.query.url_key
        }
    });
    if (error || loading) return <></>;
    console.log('router ',data)
    
    const productData = data.products.items[0]
    const addToCartHandler = () => {
        if (cart.length === 0) {
            let sCart = [productData]
            let save = JSON.stringify(sCart)
            localStorage.setItem('cart', save)
        } else { 
            let sCart = cart;
            sCart.push(productData);
            let save = JSON.stringify(sCart)
            localStorage.setItem('cart', save)
        }
        setSuccess(true)
    }

    return (
        <div className={styles.container}>
            <NavTabs />
            <Head>
                <title>Mini E-Commerce</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.mainProduct}>
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
            <Grid item xs={6}>
            <Card sx={{maxWidth: 345, paddingLeft: -5}}>
                <CardMedia
                    component="img"
                    height= "100%"
                    width="150"
                    image={productData.image.url}
                />
                </Card>
                </Grid>
                <Grid item xs={6}>
                <Card sx={{maxWidth: 500}}>
                    <Box>
                        <Typography gutterBottom variant="h5" component="div">
                            {productData.name}
                        </Typography>
                    </Box>
                    <Typography gutterBottom variant="h6" component="div">
                        Rp {productData.price_range.maximum_price.final_price.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {productData.description.html ? (<div dangerouslySetInnerHTML={{ __html: productData.description.html }}>
                        </div>) :
                            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis sint debitis magni voluptas odio corrupti praesentium mollitia delectus laudantium numquam"}
                    </Typography>

                    <Button variant="outlined" onClick={addToCartHandler}>Add to Cart</Button>
                    {success && <Alert severity="success" color="info">
                        Added to Cart !
                    </Alert>}
                </Card>
                </Grid>
                </Grid>
                </Box>
            </main>

            <footer className={styles.footer}>
                <span className={styles.logo}>
                    Created by Restiani Andhita Mustikasari
                </span>
            </footer>
        </div>
    )
}

export default withApollo({ ssr: true })(Product);
