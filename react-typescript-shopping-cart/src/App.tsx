import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { LinearProgress, Badge, Grid, Drawer } from '@material-ui/core/';
import { AddShoppingCart } from '@material-ui/icons';
import { Wrapper } from './App.styles';
import Item from './Item/Item';

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: string;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products', 
    getProducts
    );
    console.log(data);

    const getTotalItems = () => null;
    
    const handleAddToCart = (clickedItem: CartItemType) => null;

    const handleRemoveFromCart = () => null;

    if (isLoading) 
      return <LinearProgress />;

    if (error)
      return <div>Something went wrong</div>;

  return (
    <Wrapper>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddtoCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
