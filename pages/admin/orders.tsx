import { Box, Button, Grid, GridItem, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Quote } from "../../common/classes/quote";
import NavBar from "../../common/components/Header/Navbar";
import { QuoteType } from "../../common/types/firebase_types";
import { firestore } from "../../common/utils/firebase/clientApp";
import { verifyAuthSSR } from "../../common/utils/firebase/middlewares";
import { useAuth } from "../../contexts/AuthContext";
import { adminFetchDrafts } from "../../modules/admin/api/AdminAPI";
import GridContent from "../../modules/admin/components/GridContent";
import GridHeader from "../../modules/admin/components/GridHeader";


function dateFromMillis(millis: number) {
    const d = new Date(0);
    d.setUTCMilliseconds(millis);
    return d.toLocaleDateString();
}

const OrdersPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { loadingUser } = useAuth()
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);


    useEffect(() => {
        if (loadingUser.isLoading) {
            return;
        }
        else if (loadingUser.user && loadingUser.user.admin) {
            setAuthenticated(true);
        } else {
            console.log("redirecting to login...");
            router.push('/login');
        }
    }, [loadingUser]);

    console.log(props);
    return (
        <>
            <NavBar>
            </NavBar>
            {(!authenticated) ? <Spinner /> :
                <VStack align='center'><Heading>Admin Portal</Heading>

                    <Grid templateColumns={'1fr repeat(4, 3fr)'} gridColumnGap='1em' gridRowGap='.5em'>
                        <GridHeader gridColumnStart={2}>
                            Preview
                        </GridHeader>
                        <GridHeader>
                            Ship Date
                        </GridHeader>
                        <GridHeader>
                            ID
                        </GridHeader>
                        <GridHeader>
                            Purchaser
                        </GridHeader>

                        {props.data?.map((quote, index) => {
                            return (
                                <>
                                    <GridItem key={index + '0'}>
                                        <Button>Expand</Button>
                                    </GridItem>
                                    <GridContent key={index + '1'}>
                                        Test
                                    </GridContent>
                                    <GridContent key={index + '2'}>
                                        {dateFromMillis(quote.created)}
                                    </GridContent>
                                    <GridContent key={index + '3'}>
                                        {quote.id}
                                    </GridContent>
                                    <GridContent key={index + '4'}>
                                        {quote.name}
                                    </GridContent>
                                </>)

                        })}
                    </Grid>

                </VStack>
            }
        </>
    )
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const uid = await verifyAuthSSR(ctx);
    if (uid == null) {
        return {
            props: {
                data: null
            }
        }
    }

    const quotes: QuoteType[] = await adminFetchDrafts();

    return { props: { data: quotes } }

}

export default OrdersPage;

