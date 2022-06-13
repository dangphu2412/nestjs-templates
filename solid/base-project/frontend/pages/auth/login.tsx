import {Button} from '@chakra-ui/react'
import {SamlService} from "../../modules/auth/saml.service";
import {Router} from "next/router";

export default function LoginPage() {
    async function handleLogin() {
        const url = await SamlService.getLoginURL();
        window.location.href = url;
    }

    return <>
        <Button
            colorScheme='blue'
            onClick={handleLogin}
        >
            Login with google
        </Button>
    </>
}