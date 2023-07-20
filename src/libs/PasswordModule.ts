interface PasswordProps{
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
  length: number;
}

export class PasswordGenerator{
  private hasUppercase: boolean;
  private hasLowercase: boolean;
  private hasNumbers: boolean;
  private hasSymbols: boolean;
  private length: number;


  constructor({
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSymbols,
    length,
  }:PasswordProps){
    this.hasUppercase = hasUppercase
    this.hasLowercase = hasLowercase
    this.hasNumbers = hasNumbers
    this.hasSymbols = hasSymbols
    this.length = length
  }

  generatePassword(): string {
    try{
      let characters = ''
      let password = ''
  
      if (this.hasUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (this.hasLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
      if (this.hasNumbers) characters += '0123456789';
      if (this.hasSymbols) characters += '!@#$%^&*()_-+=[]{}|;:,.<>?';

      if(characters === ''){
        throw new Error('Selecione ao menos um checkbox para gerar sua senha!')
      }

      for(let i = 0; i < this.length; i++){
        const shuffle = Math.floor(Math.random() * characters.length)
        password = password + characters[shuffle]
      }

      return password
      
    }catch(error){
      throw new Error('Não foi possível gerar senha.' + error)
    }

  }
}