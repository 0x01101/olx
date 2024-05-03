"use client";

import styles from "@/app/ui/elements/login/css/loginForm.module.css";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { z } from "zod";
import config from "@/config.json";
import * as messages from "@/assets/text/messages.json";
import * as jokeMessages from "@/assets/text/jokeMessages.json";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginForm (): JSX.Element
{
  const [ msgProvider ] = useState( config.jokeFeatures ? jokeMessages : messages );
  
  const [ register, doesRegister ] = useState( false );
  const [ visible, setVisible ] = useState( false );
  const [ errorMessage, setErrorMessage ] = useState( "" );
  const { pending } = useFormStatus();
  
  const [ isValidEmail, setIsValidEmail ] = useState( true );
  const [ isValidPassword, setIsValidPassword ] = useState( true );
  
  const [ isEmailPresent, setEmailPresence ] = useState( true );
  const [ isPasswordPresent, setPasswordPresence ] = useState( true );
  
  const [ changedEmail, setChangedEmail ] = useState( false );
  const [ changedPassword, setChangedPassword ] = useState( false );
  
  const checkIfValidEmail = ( event: React.ChangeEvent<HTMLInputElement> ): void => setIsValidEmail( z.string().email().safeParse( event.target.value ).success );
  const checkIfValidPassword = ( event: React.ChangeEvent<HTMLInputElement> ): void => setIsValidPassword( z.string().min( 6 ).safeParse( event.target.value ).success );
  const checkIfEmailPresent = ( event: React.ChangeEvent<HTMLInputElement> ): void => setEmailPresence( event.target.value.length > 0 );
  const checkIfPasswordPresent = ( event: React.ChangeEvent<HTMLInputElement> ): void => setPasswordPresence( event.target.value.length > 0 );
  
  const onEmailChange = ( event: React.ChangeEvent<HTMLInputElement> ): void =>
  {
    checkIfEmailPresent( event );
    checkIfValidEmail( event );
    setChangedEmail( true );
  };
  
  const onPasswordChange = ( event: React.ChangeEvent<HTMLInputElement> ): void =>
  {
    checkIfPasswordPresent( event );
    checkIfValidPassword( event );
    setChangedPassword( true );
  };
  
  const closeError = (): void => setErrorMessage( "" );
  
  const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ): Promise<void> =>
  {
    event.preventDefault();
    const formData: FormData = new FormData( event.currentTarget );
    
    const credentials = z
    .object( { email: z.string().email(), password: z.string().min( 6 ) } )
    .safeParse( { email: formData.get( "email" ), password: formData.get( "password" ) } );
    
    if ( !credentials.success )
    {
      setErrorMessage( "Invalid credentials format" );
      return;
    }
    
    if ( register )
    {
      const response: Response = await fetch( `/api/auth/register`, {
        method: "POST",
        body:   JSON.stringify( {
          email:    credentials.data.email,
          password: credentials.data.password,
        } ),
      } );
      
      const data: { success: boolean, message?: string } = await response.json();
      
      if ( !data.success ) setErrorMessage( data.message || "Unknown error" );
    }
    
    if ( errorMessage ) return;
    await signIn( "credentials", {
      email:    credentials.data.email,
      password: credentials.data.password,
      redirect: false,
    } );
  };
  
  return (
    <div className={styles.loginBox}>
      {/* maybe TODO: add OAuth */}
      <div className={styles.withUsernameAndPassword}>
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <header className={styles.tabsHeader}>
              <button tabIndex={-1} onClick={() => doesRegister( false )}
                      className={register ? styles.tab : styles.tabSelected}>
                <span>Log In</span>
              </button>
              <button tabIndex={0} onClick={() => doesRegister( true )}
                      className={register ? styles.tabSelected : styles.tab}>
                <span>Sign Up</span>
              </button>
            </header>
          </div>
          <div className={styles.iDunno}>
            <div className={styles.iDunnoChild}></div>
          </div>
        </div>
        <div className={styles.formContainer}>
          <form noValidate={true} className={styles.form} onSubmit={handleSubmit}>
            {errorMessage ? ( <div className={styles.errorBoxContainer}>
              <div className={styles.errorBoxFunnyGuyContainer}>
                <Image src={"/app/static/media/error.svg"} alt={"error"} width={40} height={40} />
              </div>
              <div className={styles.errorBoxTextContainer}>
                <p className={styles.errorBoxText}>
                  {errorMessage}
                </p>
              </div>
              <div tabIndex={0} role={"button"} className={styles.errorBoxCloseButton} onClick={() => closeError()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24"
                     className={styles.errorBoxCloseIcon}>
                  <path fill="currentColor" fillRule="evenodd"
                        d="M20.586 2 12 10.585 3.414 2H2v1.414L10.586 12 2 20.586V22h1.414L12 13.414 20.586 22H22v-1.414L13.415 12 22 3.414V2h-1.414Z"
                        clipRule="evenodd"></path>
                </svg>
              </div>
            </div> ) : ( <></> )}
            <div className={styles.emailInputContainer}>
              <div>
                <label className={styles.inputLabel}>E-mail</label>
                <div className={styles.emailInputInnerContainer}>
                  <input name={"email"} type={"email"} className={styles.emailInput} required={true}
                         onInput={onEmailChange} />
                  <div className={styles.emailFailureIconContainer}>
                    <Icon isPresent={isEmailPresent} isValid={isValidEmail} wasChanged={changedEmail} />
                  </div>
                </div>
                <div className={styles.youFuckedUpText}>
                  {isEmailPresent ? ( isValidEmail ? "" : msgProvider.invalidEmail ) : msgProvider.noEmail}
                </div>
              </div>
            </div>
            <div className={styles.passwordInputContainer}>
              <div className={styles.passwordInputContainer2}>
                <div>
                  <label className={styles.inputLabel}>Password</label>
                  <div className={styles.passwordInputInnerContainer}>
                    <input name={"password"} type={visible ? "text" : "password"} className={styles.passwordInput}
                           onInput={onPasswordChange} />
                    <div className={styles.passwordIconContainer}>
                      <Icon isPresent={isPasswordPresent} isValid={isValidPassword} wasChanged={changedPassword} />
                      <div className={styles.passwordVisibleIconInnerContainer} onClick={() => setVisible( !visible )}>
                        {visible ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                               data-testid="eye-not" className={styles.passwordVisibleIcon}>
                            <path fill="currentColor" fillRule="evenodd"
                                  d="m3.498 2 3.984 3.985A11.008 11.008 0 0 1 12.042 5c4.747 0 8.75 2.953 10.042 7-.635 1.989-1.928 3.708-3.641 4.946l4.59 4.59v1.414H21.62L2.084 3.415V2h1.414zm1.406 5.637L6.327 9.06a7.797 7.797 0 0 0-2.197 2.939c1.249 2.974 4.408 5 7.912 5 .68 0 1.339-.097 1.982-.242l1.635 1.635a11.073 11.073 0 0 1-3.617.607C7.295 19 3.29 16.047 2 12c.54-1.692 1.559-3.19 2.904-4.363zM12.042 7c-1.051 0-2.06.203-3.004.54l1.742 1.743c.383-.18.81-.283 1.262-.283a3 3 0 0 1 3 3c0 .452-.103.879-.283 1.262l2.228 2.228c1.313-.866 2.367-2.06 2.967-3.49-1.25-2.974-4.408-5-7.912-5zm-2.98 4.796 3.183 3.183c-.068.005-.134.021-.204.021a3 3 0 0 1-3-3c0-.07.016-.136.021-.204z"></path>
                          </svg> ) : ( <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none"
                                            viewBox="0 0 24 24" data-testid="eye-yes"
                                            className={styles.passwordVisibleIcon}>
                          <path fill="currentColor" fillRule="evenodd"
                                d="M9.042 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm2 0c0 .551.449 1 1 1 .55 0 1-.449 1-1 0-.551-.45-1-1-1-.551 0-1 .449-1 1Z"
                                clipRule="evenodd"></path>
                          <path fill="currentColor" fillRule="evenodd"
                                d="M2 12c1.29-4.047 5.295-7 10.042-7s8.75 2.953 10.042 7c-1.291 4.047-5.295 7-10.042 7S3.29 16.047 2 12Zm2.13 0c1.249 2.974 4.408 5 7.912 5 3.504 0 6.663-2.026 7.912-5-1.25-2.974-4.408-5-7.912-5-3.504 0-6.663 2.026-7.912 5Z"
                                clipRule="evenodd"></path>
                        </svg> )}
                      </div>
                    </div>
                  </div>
                  <div className={styles.youFuckedUpText}>
                    {isPasswordPresent ? ( isValidPassword ? "" : msgProvider.invalidPassword ) : msgProvider.noPassword}
                  </div>
                </div>
              </div>
            </div>
            {register ? ( <></> ) : ( <button className={styles.forgorPassButton} type={"button"}>
              <span className={styles.forgorPassSpan}>
                <span>Forgot password?</span>
              </span>
            </button> )}
            <button className={styles.loginSubmitButton} type={"submit"}
                    aria-disabled={pending || !( isValidEmail && isValidPassword && changedEmail && changedPassword )}
                    disabled={pending || !( isValidEmail && isValidPassword && changedEmail && changedPassword )}>
              <span className={styles.loginSubmitButtonSpan}>
                <span>{register ? "Sign Up" : "Log In"}</span>
              </span>
            </button>
          </form>
          <p className={styles.funnyText}>
            Continuing through one of the providers indicated above<br />
            I accept the Terms and Conditions of the website<br />
            in its current form.
          </p>
        </div>
      </div>
    </div>
  );
}

function Icon ( { isPresent, isValid, wasChanged }: { isPresent: boolean, isValid: boolean, wasChanged: boolean } ): JSX.Element
{
  if ( wasChanged && ( !isPresent || !isValid ) ) return (
    <div className={styles.iconContainer}>
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24"
           className={styles.youFuckedUpIcon}>
        <path fill="currentColor" d="M11 8v5l1 1 1-1V8l-1-1-1 1ZM11 16a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"></path>
        <path fill="currentColor" fillRule="evenodd"
              d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2Zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8Z"
              clipRule="evenodd"></path>
      </svg>
    </div>
  );
  else if ( wasChanged && isValid && isPresent ) return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"
         className={styles.youDidntFuckUpIcon}>
      <path fill="currentColor" fillRule="evenodd"
            d="m20.586 5-1.271 1.296L8 17.836l-3.315-3.38-1.271-1.297H2v1.443l1.271 1.296L7.293 20h1.414L20.73 7.738 22 6.442V5z"></path>
    </svg>
  );
  return ( <></> );
}